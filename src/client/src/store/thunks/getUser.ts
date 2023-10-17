import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('users/getUser', async (userId: number) => {
  const res = await axios.get(`/_api/users?userId=${userId}`);
  return res.data;
});