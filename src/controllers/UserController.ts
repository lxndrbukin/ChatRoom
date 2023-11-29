import { Request, Response } from 'express';
import { controller, get, post, use } from './decorators';
import { comparePasswords } from './helpers';
import Multer from 'multer';
import User from '../models/User';

const storage = Multer.memoryStorage();
const upload = Multer({ storage });

@controller('/_api')
class UserController {
  @get('/current_user')
  async getCurrentUser(req: Request, res: Response) {
    if (req.session && req.session.userId) {
      const currentUser = await User.findOne({ userId: req.session.userId }).select('-_id -password -__v');
      if (currentUser) {
        return res.send(currentUser);
      }
    }
    return res.send(null);
  }

  @get('/users')
  async getUsers(req: Request, res: Response) {
    const searchResults = await User.find({
      $or: [
        { 'fullName.firstName': { $regex: req.query.search } },
        { 'fullName.lastName': { $regex: req.query.search } }
      ]
    }).select('-_id -__v -password');
    return res.send(searchResults);
  }

  @get('/users/:userId')
  async getUser(req: Request, res: Response) {
    if (req.params && req.params.userId) {
      const user = await User.findOne({ userId: req.params.userId }).select('-password -email -__v -_id');
      if (user) {
        return res.send(user);
      }
    }
    return res.send(null);
  }

  @post('/user/edit')
  @use(upload.fields([]))
  async postEditUser(req: Request, res: Response) {
    let user;
    for (let key in req.body) {
      try {
        if (typeof req.body[key] === 'string') {
          req.body = { ...req.body, [key]: JSON.parse(req.body[key]) };
          if (key === 'passwords') {
            const passwords = req.body[key];
            const { currentPassword, newPassword, confirmNewPassword } = passwords;
            user = await User.findOne({ userId: req.session!.userId });
            if (user) {
              if (await comparePasswords(user.password, currentPassword) && newPassword === confirmNewPassword) {
                await user.updateOne({ password: newPassword });
              }
            }
          }
        }
      } catch (err) {
        req.body = { ...req.body, [key]: req.body[key] };
      }
    }
    user = await User.findOneAndUpdate(
      { userId: req.session!.userId },
      { ...req.body },
      { new: true }
    ).select('-_id -password -__v');
    return res.send(user);
  }
}

