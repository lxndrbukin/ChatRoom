import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFriendReqNotifications = createAsyncThunk(
  'notifications/getFriendReqNotifications',
  async (userId: number) => {
    const res = await axios.get(`/_api/friend_requests?userId=${userId}`);
    return res.data;
  }
);
