import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import http from 'http';
import { Router } from './router';
import { keys } from './services/keys';

import './controllers/AuthController';

import './models/User';
import './models/Chat';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
  socketIO.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

mongoose
  .connect(keys.mongoDB)
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log('Server running on port', PORT));
