import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChatMembers = createAsyncThunk('chats/getChatMembers', async (chatId: number) => {
  const res = await axios.get('/_api/');
});