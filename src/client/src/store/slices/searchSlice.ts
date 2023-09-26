import { createSlice } from '@reduxjs/toolkit';
import { SearchState } from './types';
import { findUser } from '../thunks/findUser';

const initialState: SearchState = {
  users: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  }
});

export default searchSlice.reducer;