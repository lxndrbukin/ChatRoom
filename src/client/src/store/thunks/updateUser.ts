import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';;

export const updateUser = createAsyncThunk('session/updateUser', async (data: any) => {
  const res = await axios.post('/_api/user/edit', { ...data });
  return res.data;
});