import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthFormValues } from './types';

export const signup = createAsyncThunk('session/signup', async (formValues: AuthFormValues) => {
  const res = await axios.post('/auth/signup', { ...formValues });
  return res.data;
});