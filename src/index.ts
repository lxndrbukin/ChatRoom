import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import http from 'http';
import { Router } from './router';
import { keys } from './services/keys';
import { io } from './socket';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: keys.cloud_name,
  api_key: keys.cloudinary_key,
  api_secret: keys.cloudinary_secret,
});

import './controllers/AuthController';
import './controllers/UserController';
import './controllers/ProfileController';
import './controllers/ChatController';
import './controllers/FriendsListController';

import './models/User';
import './models/Chat';
import './models/ChatsList';
import './models/Profile';
import './models/FriendsList';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
