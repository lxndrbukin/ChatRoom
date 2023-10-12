import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserFriends = createAsyncThunk('friends/getUserFriends', async (userId: number, listType) => {
  const res = await axios.get(`/_api/friends_list?userId=${userId}&listType=${listType}`);
  return res.data;
});