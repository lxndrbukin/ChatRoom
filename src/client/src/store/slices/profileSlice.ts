import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Slices, ProfileState, ProfileInfo, UpdateProfilePayload, UserData } from './types';
import { getProfile } from '../thunks/getProfile';
import { updateProfile } from '../thunks/updateProfile';
import { getProfileFriends } from '../thunks/getProfileFriends';

const initialState: ProfileState = {
  info: undefined,
  friends: undefined
};

const profileSlice = createSlice({
  name: Slices.Profile,
  initialState,
  reducers: {
    updateProfileStatus(state, action) {
      if (state.info) {
        state.info.status = {
          ...action.payload
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProfile.fulfilled,
      (state: ProfileState, action: PayloadAction<ProfileInfo>) => {
        state.info = action.payload;
      }
    );
    builder.addCase(updateProfile.fulfilled, (state: ProfileState, action: PayloadAction<UpdateProfilePayload>) => {
      state.info = action.payload.profile;
    });
    builder.addCase(getProfileFriends.fulfilled, (state: ProfileState, action: PayloadAction<UserData[]>) => {
      state.friends = action.payload;
    });
  },
});

export default profileSlice.reducer;
export const { updateProfileStatus } = profileSlice.actions;