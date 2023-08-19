import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use } from './decorators';
import Chat from '../models/Chat';
import { createPassword, comparePasswords } from './helpers';

@controller('/_api')
class ChatController {
  @get('/chats')
  async getChats(req: Request, res: Response) {
    const chats = await Chat.find({ members: { $all: [{ userId: req.params.userId }] } });
    res.send(chats);
  }

  @post('/chats')
  async postChats(req: Request, res: Response) {
    if (req.session) {
      const num = await Chat.count();
      if (req.body.password) {
        const chat = await Chat.create({ chatId: num, chatName: req.body.chatName, password: createPassword(req.body.password), members: [req.body.user], messages: [] });
        return res.send(chat);
      }
      const chat = await Chat.create({ chatId: num, chatName: req.body.chatName, members: [req.body.user], messages: [] });
      return res.send(chat);
    }
  }

  @post('/chats/:chatId')
  async postChat(req: Request, res: Response) {
    const chat = await Chat.findOne({ chatId: req.params.chatId });
    if (chat) {
      if (chat.password && await comparePasswords(chat.password, req.body.password)) {

      }
    }
  }
}