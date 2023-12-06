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
    let sessionChatsList = await ChatsList.findOne({
      userId: req.session!.userId,
    });
    let userChatsList = await ChatsList.findOne({ userId: user.userId });

    if (sessionChatsList) {
      const chatId = sessionChatsList.chatsList;
      sessionChatsList = await sessionChatsList.updateOne(
        { $push: { chatsList: chat } },
        { new: true }
      );
    }
    if (userChatsList) {
      userChatsList.updateOne({ $push: { chatsList: chat } });
    }
  }
}
