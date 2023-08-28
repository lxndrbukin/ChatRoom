import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserData, Slices } from './types';
import { signup } from '../thunks/signup';
import { login } from '../thunks/login';

const initialState: UserState = {
  isLoggedIn: false,
  userData: undefined
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
    builder.addCase(login.fulfilled, (state: UserState, action: PayloadAction<UserData>) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    });
  }
});

export default sessionSlice.reducer;