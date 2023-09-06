import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slices, ChatsState, Chat, ChatMessage } from './types';

const initialState: ChatsState = {
  currentChat: undefined,
  chatsList: []
};

const chatsSlice = createSlice({
  name: Slices.Chats,
  initialState,
  reducers: {
    createChat(state: ChatsState, action: PayloadAction<Chat>) {
      state.chatsList.push(action.payload);
    },
    fetchAllChats(state: ChatsState, action: PayloadAction<Chat[]>) {
      state.chatsList = action.payload;
    },
    deleteChat(state: ChatsState, action: PayloadAction<Chat>) {
      const filtered = state.chatsList.filter(chat => chat.chatId !== action.payload.chatId);
      state.chatsList = filtered;
    },
    selectChat(state: ChatsState, action: PayloadAction<Chat>) {
      state.currentChat = action.payload;
    },
    fetchChat(state: ChatsState, action: PayloadAction<Chat>) {
      state.currentChat = action.payload;
    },
    sendMessage(state: ChatsState, action: PayloadAction<ChatMessage>) {
      if (state.currentChat) {
        state.currentChat.messages.push(action.payload);
      }
    }
  }
});

export default chatsSlice.reducer;
export const { createChat, fetchAllChats, deleteChat, selectChat, fetchChat } = chatsSlice.actions;