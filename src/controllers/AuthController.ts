import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import User from '../models/User';
import { createPassword } from './helpers';

@controller('/auth')
class AuthController {
  @get('/signup')
  getSignup(req: Request, res: Response) {
    res.send(/*html*/ `
    <form method='POST'>
      <input name='nickname' type='text' />
      <input name='password' type='password' />
      <button>Submit</button>
    </form>
  `);
  }

  @post('/signup')
  @bodyValidator('nickname', 'password')
  async postSignup(req: Request, res: Response) {
    const { nickname, password } = req.body;
    const user = await User.create({
      nickname,
      password: await createPassword(password),
      role: 'User'
    });
    res.send(user);
  }
}