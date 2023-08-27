import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthFormValues } from './types';

export const signupUser = createAsyncThunk('session/signupUser', async (user: AuthFormValues) => {
  const res = await axios.post('');
});