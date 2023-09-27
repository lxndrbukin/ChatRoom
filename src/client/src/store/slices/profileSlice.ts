import { createSlice } from '@reduxjs/toolkit';
import { Slices, ProfileState } from './types';

const initialState: ProfileState = {
  info: undefined
};

const profileSlice = createSlice({
  name: Slices.Profile,
  initialState,
  reducers: {}
});

export default profileSlice.reducer;