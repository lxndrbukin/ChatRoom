import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import User from '../models/User';
import { createPassword, comparePasswords } from './helpers';

@controller('/auth')
class AuthController {
  @get('/login')
  getLogin(req: Request, res: Response) {
    res.send(/*html*/ `
    <form method='POST'>
      <input name='email' type='text' />
      <input name='password' type='password' />
      <button>Submit</button>
    </form>
  `);
  }

  @post('/login')
  async postLogin(req: Request, res: Response) {
    if (req.body.email) {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(403).json({ message: 'User does not exist' });
        return;
      }
      if (user && !await comparePasswords(user.password, req.body.password)) {
        res.status(403).json({ message: 'Incorrect password' });
        return;
      }
    }
  }

  @get('/signup')
  getSignup(req: Request, res: Response) {
    res.send(/*html*/ `
    <form method='POST'>
      <input name='nickname' type='text' />
      <input name='email' type='email' />
      <input name='password' type='password' />
      <button>Submit</button>
    </form>
  `);
  }

  @post('/signup')
  @bodyValidator('email', 'nickname', 'password')
  async postSignup(req: Request, res: Response) {
    const { email, nickname, password } = req.body;
    const num = await User.count();
    const user = await User.create({
      userId: num + 1,
      nickname,
      email,
      password: await createPassword(password),
      role: 'User'
    });
    const { userId, role } = user;
    req.session = { userId, email, nickname, role };
    return res.send(req.session);
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.send({});
  }
}