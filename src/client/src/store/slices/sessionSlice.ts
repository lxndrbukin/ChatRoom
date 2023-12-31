import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserData, Slices, UserOnlineStatus } from './types';
import { signup } from '../thunks/signup';
import { login } from '../thunks/login';
import { logout } from '../thunks/logout';
import { getSession } from '../thunks/getSession';
import { updateUser } from '../thunks/updateUser';

const initialState: UserState = {
  isLoggedIn: false,
  userData: undefined,
  message: undefined
};

const sessionSlice = createSlice({
  name: Slices.Session,
  initialState,
  reducers: {
    updateSessionStatus(state: UserState, action: PayloadAction<UserOnlineStatus>) {
      if (state.userData) {
        state.userData.status = {
          ...action.payload
        };
      }
    }
  },
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
    builder.addCase(updateUser.fulfilled, (state: UserState, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    });
  }
});

export default sessionSlice.reducer;
export const { updateSessionStatus } = sessionSlice.actions;