import { Request, Response } from 'express';
import { controller, get, post } from './decorators';
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
  async postEditUser(req: Request, res: Response) {
    if (req.session) {
      const user = await User.updateOne(
        { userId: req.session.userId },
        { ...req.body },
        { new: true }
      ).select('-_id -password -__v');
      return res.send(user);
    }
  }
}

