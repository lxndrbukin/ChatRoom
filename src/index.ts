import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import http from 'http';
import { Router } from './router';
import { keys } from './services/keys';
import Chat from './models/Chat';
import User from './models/User';

import './controllers/AuthController';
import './controllers/UserController';
import './controllers/ChatController';

import './models/User';
import './models/Chat';
import './models/Profile';

const app = express();
app.use(express.json());
app.use(
  cookieSession({
    keys: ['123safa'],
  })
);
app.use(Router.getInstance());
app.use(cors());

const server = http.createServer(app);
const socketIO = require('socket.io')(server, {
  cors: 'http://localhost:3000',
});

socketIO.on('connection', (socket: any): void => {
  console.log(`User ${socket.id} just connected`);

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
    const chat = await Chat.findOne({ chatId: data.chatId });
    await Chat.updateOne({ chatId: data.chatId }, { $push: { messages: { userId: data.userId, nickname: data.nickname, message: data.message } } });
    socketIO.emit('event://send-message-res', { chatId: data.chatId, userId: data.userId, nickname: data.nickname, message: data.message });
  });

  socket.on('event://typing-message', (data: any): void => {
    socketIO.emit('event://typing-message-res', data);
  });

  socket.on('event://user-search', async (data: any): Promise<void> => {
    const searchResults = await User.find({ nickname: { $regex: data } }).select('-_id -__v -password');
    socketIO.emit('event://user-search-res', searchResults);
  });

  socket.on('disconnect', (): void => {
    console.log(`User ${socket.id} just disconnected`);
  });
});

mongoose
  .connect(keys.mongoDB)
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
server.listen(PORT, (): void => console.log('Server running on port', PORT));
