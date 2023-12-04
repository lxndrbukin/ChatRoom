import { Request, Response } from 'express';
import { controller, get, post, put } from './decorators';
import { IChat } from '../models/types';
import ChatsList from '../models/ChatsList';

@controller('/_api')
class ChatsListController {
  @get('/chats-list')
  async getChatsList(req: Request, res: Response) {}

  @put('/chats-list')
  async putChatsList(req: Request, res: Response) {
    let chat;
    const { user } = req.body;
    const sessionChatsList = await ChatsList.findOne({
      userId: req.session!.userId,
    });
    const userChatsList = await ChatsList.findOne({ userId: user.userId });
  }
}
