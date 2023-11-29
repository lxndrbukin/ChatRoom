import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import User from '../models/User';
import Profile from '../models/Profile';
import FriendsList from '../models/FriendsList';
import { createPassword, comparePasswords } from './helpers';

@controller('/auth')
class AuthController {
  @post('/login')
  async postLogin(req: Request, res: Response) {
    if (req.body.email) {
      const user = await User.findOne({ email: req.body.email }).select(
        '-_id -__v'
      );
      if (!user) {
        return res.status(403).json({ message: 'User does not exist' });
      }
      if (user && !(await comparePasswords(user.password, req.body.password))) {
        return res.status(403).json({ message: 'Incorrect password' });
      }
      req.session = user;
      return res.send(req.session);
    }
  }

  @post('/signup')
  @bodyValidator('email', 'firstName', 'lastName', 'password')
  async postSignup(req: Request, res: Response) {
    const { email, firstName, lastName, password } = req.body;
    const fullName = { firstName, lastName };
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(403)
        .json({ message: 'Email or Nickname already in use.' });
    }
    const userNum = await User.count();
    const user = await User.create({
      userId: userNum + 1,
      fullName,
      email,
      password: await createPassword(password),
    });
    await Profile.create({
      userId: userNum + 1,
      fullName,
      email,
    });
    await FriendsList.create({
      userId: userNum + 1,
      friendsList: [],
    });
    const { userId } = user;
    req.session = { userId, email, fullName };
    return res.send(req.session);
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.send({});
  }
}
