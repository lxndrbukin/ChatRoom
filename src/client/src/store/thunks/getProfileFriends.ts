import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProfileFriends = createAsyncThunk('profile/getProfileFriends', async (userId: number) => {
  const res = await axios.get(`/_api/profile_friends_list?userId=${userId}`);
  return res.data;
});