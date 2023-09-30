import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import http from 'http';
import { Router } from './router';
import { keys } from './services/keys';
import { io } from './socket';

import './controllers/AuthController';
import './controllers/UserController';
import './controllers/ProfileController';
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

io(socketIO);

mongoose
  .connect(keys.mongoDB)
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
server.listen(PORT, (): void => console.log('Server running on port', PORT));
