import { createAsyncThunk } from '@reduxjs/toolkit';
import { FriendRequestData } from './types';
import axios from 'axios';

export const changeFriendStatus = createAsyncThunk('friends/sendFriendRequest', async (requestData: FriendRequestData) => {
  const res = await axios.post('/_api/friend_requests', { ...requestData });
  return res.data;
});