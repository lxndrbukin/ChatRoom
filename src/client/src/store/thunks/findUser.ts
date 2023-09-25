import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const findUser = createAsyncThunk('search/findUser', async (searchReq: string) => {
  const res = await axios.post('/_api/users', { searchReq });
  return res.data;
});