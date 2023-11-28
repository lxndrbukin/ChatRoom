import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUser = createAsyncThunk('session/updateUser', async (formValues: any) => {
  const res = await axios.post('/_api/user/edit', formValues);
  return res.data;
});