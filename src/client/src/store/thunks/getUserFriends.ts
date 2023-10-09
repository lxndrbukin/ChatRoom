import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserFriends = createAsyncThunk('friends/getUserFriends', async (userId: number) => {
  const res = await axios.get(`/_api/friends_list?userId=${userId}`);
  return res.data;
});