import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import http from 'http';
import { Router } from './router';
import { keys } from './services/keys';
import User from './models/User';
import Chat from './models/Chat';

import './controllers/AuthController';

import './models/User';
import './models/Chat';

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

  socket.on('event://signup-user', async (data: any) => {
    const user = await User.create({ ...data, role: 'User' });
    user.save();
    const { userId, email, nickname, role } = user;
    socketIO.emit('event://login-user', {
      userId,
      email,
      nickname,
      role,
    });
  });

  socket.on('event://login-user', async (data: any) => {
    const user = await User.findOne({ email: data.email });
    if (user) {
      const { userId, email, nickname, role } = user;
      socketIO.emit('event://login-user', {
        userId,
        email,
        nickname,
        role
      });
    }
    return;
  });

  socket.on('event://create-chat', async (data: any) => {
    console.log(data);
    const chat = await Chat.create(data);
    chat.save();
    const { chatId, chatName, members, messages } = chat;
    socketIO.emit('event://get-chat', {
      chatId,
      chatName,
      members,
      messages,
    });
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} just disconnected`);
  });
});

mongoose
  .connect(keys.mongoDB)
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server running on port', PORT));
