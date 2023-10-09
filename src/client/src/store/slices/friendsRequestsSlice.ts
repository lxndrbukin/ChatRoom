import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Slices, FriendsRequests } from './types';
import { getUserFriends } from '../thunks/getUserFriends';

const initialState: FriendsRequests = {
  friendsList: [],
  requestsList: [],
  sentRequests: [],
};

const friendRequestsSlice = createSlice({
  name: Slices.FriendsList,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserFriends.fulfilled, (state: FriendsRequests, action: PayloadAction<FriendsRequests>) => {
      state.friendsList = action.payload.friendsList;
      state.requestsList = action.payload.requestsList;
      state.sentRequests = action.payload.sentRequests;
    });
  }
});

export default friendRequestsSlice.reducer;