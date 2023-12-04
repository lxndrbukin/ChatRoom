import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ChatMember } from './types';

export const createChats = createAsyncThunk(
  'chats/createChat',
  async (user: ChatMember) => {
    const res = await axios.post('/_api/chats', user);
    return res.data;
  }
);
