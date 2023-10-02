import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Slices, ProfileState, ProfileInfo } from './types';
import { getProfile } from '../thunks/getProfile';
import { updateProfile } from '../thunks/updateProfile';

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
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.info = action.payload.profile;
    });
  },
});

export default profileSlice.reducer;
