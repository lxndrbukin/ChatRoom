import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { Router } from './router';
import { keys } from './services/keys';

import './controllers/AuthController';

import './models/User';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
  keys: ['123safa'],
}));
app.use(Router.getInstance());
app.use(cors());

mongoose
  .connect(keys.mongoDB)
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch((error) => console.log(error));

const PORT = 5000;
app.listen(PORT, () => console.log('Server running on port', PORT));