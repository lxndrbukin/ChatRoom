import Chat from '../models/Chat';
import User from '../models/User';
import Profile from '../models/Profile';

export const io = (socketIO: any): void => {
  socketIO.on('connection', (socket: any): void => {
    console.log(`User ${socket.id} just connected`);

    socket.on('event://update-user-status', async (data: any) => {
      await User.findOneAndUpdate(
        { userId: data.userId },
        {
          'status.onlineStatus': data.status,
          'status.previousOnlineStatus': data.previousStatus,
          'status.lastSeen': new Date()
        }).select('-_id -__v -password');
      await Profile.findOneAndUpdate(
        { userId: data.userId },
        {
          'status.onlineStatus': data.status,
          'status.previousOnlineStatus': data.previousStatus,
          'status.lastSeen': new Date()
        });
      socketIO.emit('event://update-user-status-res', data.status);
      console.log(`Status updated to ${data.status}`);
    });

    socket.on('event://create-chat', async (data: any) => {
      const id = await Chat.count() + 1;
      const chat = await Chat.create({ chatId: id, chatName: data.chatName, messages: [], members: [data.createdBy], password: data.password });
      const { chatId, chatName, members, messages } = chat;
      socketIO.emit('event://create-chat-res', {
        chatId,
        chatName,
        members,
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