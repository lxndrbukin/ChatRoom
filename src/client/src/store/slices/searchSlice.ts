import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchState, UserData } from './types';
import { findUser } from '../thunks/findUser';

const initialState: SearchState = {
  users: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findUser.fulfilled, (state: SearchState, action: PayloadAction<UserData[]>) => {
      state.users = action.payload;
    });
  }
});

export default searchSlice.reducer;