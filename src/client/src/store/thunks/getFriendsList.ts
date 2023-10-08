import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFriendsList = createAsyncThunk('friends/getFriendsList', async () => {
  const res = await axios.get('/_api/friend_requests');
  return res.data;
});