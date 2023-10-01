import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateProfile = createAsyncThunk('profile/updateProfile', async (formValues: any) => {
  const res = await axios.post('/_api/profile/edit', formValues);
  return res.data;
});