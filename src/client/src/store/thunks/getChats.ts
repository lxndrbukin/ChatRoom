import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChats = createAsyncThunk('chats/getChats', async () => {
  const res = await axios.get('/_api/chats');
  return res.data;
});