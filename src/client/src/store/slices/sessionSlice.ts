import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserData, Slices } from './types';

const initialState: UserState = {
  isLoggedIn: false,
  userData: undefined
};

const sessionSlice = createSlice({
  name: Slices.Session,
  initialState,
  reducers: {
    loginUser(state: UserState, action: PayloadAction<UserData>) {
      state.isLoggedIn = true;
      state.userData = action.payload;
    }
  }
});

export default sessionSlice.reducer;
export const { loginUser } = sessionSlice.actions;