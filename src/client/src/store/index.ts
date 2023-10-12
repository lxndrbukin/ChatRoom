import { configureStore } from '@reduxjs/toolkit';
import sessionSlice from './slices/sessionSlice';
import chatsSlice from './slices/chatsSlice';
import profileSlice from './slices/profileSlice';
import searchSlice from './slices/searchSlice';
import friendRequestsSlice from './slices/friendsRequestsSlice';
import notificationsSlice from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    session: sessionSlice,
    chats: chatsSlice,
    profile: profileSlice,
    friends: friendRequestsSlice,
    notifications: notificationsSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './slices/types';
export * from './thunks/types';
export * from './slices/sessionSlice';
export * from './slices/chatsSlice';
export * from './slices/searchSlice';
export * from './thunks/signup';
export * from './thunks/login';
export * from './thunks/logout';
export * from './thunks/getSession';
export * from './thunks/getChat';
export * from './thunks/findUser';
export * from './thunks/getProfile';
export * from './thunks/updateProfile';
export * from './thunks/changeFriendStatus';
export * from './thunks/getProfileFriends';
export * from './thunks/getUserFriends';
export * from './thunks/getFriendReqNotifications';
