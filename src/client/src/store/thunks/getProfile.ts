import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProfile = createAsyncThunk('profile/getProfile', async (userId: string) => {
  const res = await axios.get(`/_api/profile?userId=${userId}`);
  return res.data;
});