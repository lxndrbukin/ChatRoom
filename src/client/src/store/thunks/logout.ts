import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logout = createAsyncThunk('currentUser/logoutUser', async (): Promise<object> => {
  const res = await axios.get('/auth/logout');
  return res.data;
});