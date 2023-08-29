import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slices, ChatsState, Chat } from './types';

const initialState: ChatsState = {
  currentChat: [],
  chatsList: []
};

const chatsSlice = createSlice({
  name: Slices.Chats,
  initialState,
  reducers: {
    getChat(state: ChatsState, action: PayloadAction<Chat>) {
      state.chatsList.push(action.payload);
    }
  }
});

export default chatsSlice.reducer;
export const { getChat } = chatsSlice.actions;