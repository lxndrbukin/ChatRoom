import { Request, Response } from 'express';
import { controller, get, post } from './decorators';
import User from '../models/User';

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
        { 'fullName.firstName': { $regex: req.query.searchReq } },
        { 'fullName.lastName': { $regex: req.query.searchReq } }
      ]
    }).select('-_id -__v -password');
    return res.send(searchResults);
  }

  @get('/users/:userId')
  async getUser(req: Request, res: Response) {
    if (req.params && req.params.userId) {
      const user = await User.findOne({ userId: req.params.userId }).select('-password -email -__v');
      if (user) {
        return res.send(user);
      }
    }
    return res.send(null);
  }

  @post('/users/:userId/edit')
  async updateUser(req: Request, res: Response) {

  }
}