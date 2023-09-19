import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChat = createAsyncThunk('chats/getChat', async (chatId: string) => {
  const res = await axios.get(`/_api/chats/${chatId}`);
  return res.data;
});