import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  user: {}
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    findUser(state, action) {
      state.user = action.payload;
    }
  }
});

export default searchSlice.reducer;
export const { findUser } = searchSlice.actions;