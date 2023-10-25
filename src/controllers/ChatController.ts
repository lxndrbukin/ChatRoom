import { Request, Response } from 'express';
import { controller, get, post, bodyValidator, use, put } from './decorators';
import Chat from '../models/Chat';
import User from '../models/User';
import { createPassword, comparePasswords } from './helpers';

@controller('/_api')
class ChatController {
  @get('/chats')
  async getChats(req: Request, res: Response) {
    if (req.session) {
      const { userId } = req.session;
      const chatsRes = await Chat.find({ memberIds: { $in: [userId] } });
      const chats = chatsRes.map(chat => {
        const { messages, chatId, memberIds } = chat;
        const members = memberIds.map(async (member) => {
          return await User.findOne({ userId: member.userId }).select('-__v -_id -password');
        });
        return {
          chatId,
          members,
          lastMessage: messages[messages.length - 1]
        };
      });
      return res.send(chats);
    }
  }

  @post('/chats')
  async postChats(req: Request, res: Response) {
    if (req.session) {
      const num = await Chat.count();
      if (req.body.password) {
        const chat = await Chat.create({
          chatId: num,
          chatName: req.body.chatName,
          password: createPassword(req.body.password),
          members: [req.body.user],
          messages: [],
        });
        return res.send(chat);
      }
      const chat = await Chat.create({
        chatId: num,
        chatName: req.body.chatName,
        members: [req.body.user],
        messages: [],
      });
      return res.send(chat);
    }
  }

  @post('/chats/:chatId')
  async postChat(req: Request, res: Response) {
    const { userId, nickname, role } = req.body;
    const user = { userId, nickname, role };
    const chat = await Chat.findOneAndUpdate(
      { chatId: req.params.chatId },
      { $push: { members: user } },
      { new: true }
    );
    if (chat) {
      if (
        chat.password &&
        !(await comparePasswords(chat.password, req.body.password))
      ) {
        return res.status(403).json({ message: 'Incorrect password' });
      }
    }
    return res.send(chat);
  }

  @get('/chats/:chatId')
  async getChat(req: Request, res: Response) {
    const { chatId } = req.params;
    const chatRes = await Chat.findOne({ chatId }).select('-__v -_id');
    const chatMembers = chatRes?.memberIds.map(async (member) => {
      return await User.findOne({ userId: member.userId }).select('-_id -__v -password');
    });
    const chat = {
      ...chatRes,
      members: chatMembers
    };
    return res.send(chat);
  }
}
