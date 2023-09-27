import { Request, Response } from 'express';
import { controller, get } from './decorators';
import Profile from '../models/Profile';

@controller('/_api')
class ProfileController {
  @get('/profile')
  async getProfile(req: Request, res: Response) {
    const profile = await Profile.findOne({ userId: req.body.userId });
    return res.send(profile);
  }
}