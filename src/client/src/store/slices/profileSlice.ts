import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Slices, ProfileState, ProfileInfo } from './types';
import { getProfile } from '../thunks/getProfile';

const initialState: ProfileState = {
  info: undefined,
};

const profileSlice = createSlice({
  name: Slices.Profile,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProfile.fulfilled,
      (state: ProfileState, action: PayloadAction<ProfileInfo>) => {
        state.info = action.payload;
      }
    );
  },
});

export default profileSlice.reducer;
