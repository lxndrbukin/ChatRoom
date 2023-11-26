import Chat from '../models/Chat';
import User from '../models/User';
import Profile from '../models/Profile';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dpjgiuxf2',
  api_key: '469618289571349',
  api_secret: '0PUkvOQmZmpYQYPN3Ljx94gVFVQ'
});

export const io = (socketIO: any): void => {
  socketIO.on('connection', (socket: any): void => {
    console.log(`User ${socket.id} just connected`);

    socket.on('event://update-user-status', async (data: any) => {
      const { onlineStatus, previousOnlineStatus } = data;
      await User.findOneAndUpdate(
        { userId: data.userId },
        {
          'status.onlineStatus': onlineStatus,
          'status.previousOnlineStatus': previousOnlineStatus,
          'status.lastSeen': new Date().getTime()
        }).select('-_id -__v -password');
      await Profile.findOneAndUpdate(
        { userId: data.userId },
        {
          'status.onlineStatus': onlineStatus,
          'status.previousOnlineStatus': previousOnlineStatus,
          'status.lastSeen': new Date().getTime()
        });
      socketIO.emit('event://update-user-status-res', { userId: data.userId, onlineStatus, previousOnlineStatus });
    });

    socket.on('event://create-chat', async (data: any) => {
      const id = await Chat.count() + 1;
      const chat = await Chat.create({ chatId: id, chatName: data.chatName, messages: [], members: [data.createdBy], password: data.password });
      const { chatId, messages } = chat;
      socketIO.emit('event://create-chat-res', {
        chatId,
        messages,
      });
    });

    socket.on('event://fetch-chats', async (): Promise<void> => {
      const chats = await Chat.find().select('-_id -__v');
      socketIO.emit('event://fetch-chats-res', chats);
    });

    socket.on('event://fetch-chat', async (data: any): Promise<void> => {
      const chat = await Chat.findOne({ chatId: data });
      socketIO.emit('event://fetch-chat-res', chat);
    });

    socket.on('event://send-message', async (data: any): Promise<void> => {
      await Chat.updateOne({ chatId: data.chatId }, { $push: { messages: { userId: data.userId, nickname: data.nickname, message: data.message } } });
      socketIO.emit('event://send-message-res', { chatId: data.chatId, userId: data.userId, nickname: data.nickname, message: data.message });
    });

    socket.on('event://typing-message', (data: any): void => {
      socketIO.emit('event://typing-message-res', data);
    });

    socket.on('disconnect', (): void => {
      console.log(`User ${socket.id} just disconnected`);
    });
  });
};