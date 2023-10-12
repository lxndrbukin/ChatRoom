import { createSlice } from '@reduxjs/toolkit';
import { Notifications } from './types';
import { getFriendReqNotifications } from '../thunks/getFriendReqNotifications';

const initialState: Notifications = {
  friendRequests: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFriendReqNotifications.fulfilled, (state, action) => {
      state.friendRequests = action.payload;
    });
  },
});

export default notificationsSlice.reducer;
