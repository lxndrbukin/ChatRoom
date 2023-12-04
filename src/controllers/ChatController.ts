import { Request, Response } from 'express';
import { controller, get, post, put } from './decorators';
import { ChatMemberId, ChatMessage } from '../models/types';
import Chat from '../models/Chat';
import User from '../models/User';

@controller('/_api')
class ChatController {
  @post('/chats')
  async postChat(req: Request, res: Response) {
    if (req.session) {
      const { userId, fullName } = req.session;
      const { user } = req.body;
      const sessionUser = { userId, fullName };
      const num = await Chat.count();
      const chat = await Chat.create({
        chatId: num + 1,
        members: [sessionUser, user],
        messages: [],
      });
      return res.send(chat);
    }
  }

  @put('/chats/:chatId')
  async putChat(req: Request, res: Response) {
    const { userId, nickname, role } = req.body;
    const user = { userId, nickname, role };
    const chat = await Chat.findOneAndUpdate(
      { chatId: req.params.chatId },
      { $push: { members: user } },
      { new: true }
    );
    return res.send(chat);
  }

  @get('/chats')
  async getChats(req: Request, res: Response) {
    if (req.session) {
      const { userId } = req.session;
      const chatsRes = await Chat.find({ memberIds: { $in: [userId] } });
      const chats = chatsRes.map((chat) => {
        const { memberIds } = chat;
        const messages = chat?.messages.filter(
          (message: ChatMessage) => message.read === false
        );
        const members = memberIds.map(async (member) => {
          return await User.findOne({ userId: member.userId }).select(
            '-__v -_id -password'
          );
        });
        return {
          ...chat,
          members,
          messages,
        };
      });
      return res.send(chats);
    }
  }

  @get('/chats/:chatId')
  async getChat(req: Request, res: Response) {
    const { chatId } = req.params;
    const chatRes = await Chat.findOne({ chatId }).select('-__v -_id');
    const chatMembers = chatRes?.memberIds.map(async (member: ChatMemberId) => {
      return await User.findOne({ userId: member.userId }).select(
        '-_id -__v -password'
      );
    });
    const chat = {
      ...chatRes,
      members: chatMembers,
    };
    return res.send(chat);
  }
}
