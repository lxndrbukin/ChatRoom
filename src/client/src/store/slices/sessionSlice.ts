import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserData, Slices, UpdateProfilePayload } from './types';
import { signup } from '../thunks/signup';
import { login } from '../thunks/login';
import { logout } from '../thunks/logout';
import { getSession } from '../thunks/getSession';
import { updateProfile } from '../thunks/updateProfile';

const initialState: UserState = {
  isLoggedIn: false,
  userData: undefined,
  message: undefined
};

const sessionSlice = createSlice({
  name: Slices.Session,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state: UserState, action: PayloadAction<UserData>) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    });
    builder.addCase(signup.rejected, (state: UserState) => {
      state.message = 'Email or Nickname already in use.';
    });
    builder.addCase(login.fulfilled, (state: UserState, action: PayloadAction<UserData>) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    });
    builder.addCase(logout.fulfilled, (state: UserState) => {
      state.isLoggedIn = false;
      state.userData = undefined;
    });
    builder.addCase(getSession.fulfilled, (state: UserState, action: PayloadAction<UserData>) => {
      if (action.payload) {
        state.isLoggedIn = true;
        state.userData = action.payload;
      }
    });
    builder.addCase(updateProfile.fulfilled, (state: UserState, action: PayloadAction<UpdateProfilePayload>) => {
      state.userData = action.payload.user;
    });
  }
});

export default sessionSlice.reducer;