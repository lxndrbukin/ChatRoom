import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthFormValues } from './types';

export const login = createAsyncThunk('session/login', async (formValues: AuthFormValues) => {
  const res = await axios.post('/auth/login', { ...formValues });
  return res.data;
});