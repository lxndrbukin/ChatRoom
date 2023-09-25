import { createSlice } from '@reduxjs/toolkit';
import { SearchState } from './types';

const initialState: SearchState = {
  searchReq: '',
  users: []
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchReq(state, action) {
      state.searchReq = action.payload;
    }
  }
});

export default searchSlice.reducer;
export const { setSearchReq } = searchSlice.actions;