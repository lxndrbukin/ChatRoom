import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const findUser = createAsyncThunk('search/findUser', async (searchReq: string) => {
  const res = await axios.get(`/_api/users?search=${searchReq}`);
  return res.data;
});