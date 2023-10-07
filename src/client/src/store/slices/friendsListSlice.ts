import { createSlice } from '@reduxjs/toolkit';
import { Slices } from './types';

const initialState = {
  friendsList: [],
  requestsList: [],
  sentRequests: [],
};

const friendsListSlice = createSlice({
  name: Slices.FriendsList,
  initialState,
  reducers: {}
});

export default friendsListSlice.reducer;