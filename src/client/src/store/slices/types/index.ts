export enum Slices {
  Session = 'session',
  Chats = 'chats'
}

export interface UserData {
  userId: number;
  email: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  nickname: string;
  role: string;
}

export interface UserState {
  isLoggedIn: boolean;
  userData: UserData | undefined;
  message: string | undefined;
}

export interface ChatsListItem {
  chatId: string;
  chatName: string;
  password?: string;
}

export interface Chat {
  chatId: number;
  members: UserData[];
  messages: ChatMessage[];
}

export interface ChatMessage {
  messageId: string;
  userId: number;
  nickname: string;
  message: string;
}

export interface SendMessageRes extends ChatMessage {
  chatId: string;
}

export interface ChatsState {
  currentChat: Chat | undefined,
  chatsList: ChatsListItem[];
}

export interface SearchState {
  users: UserData[];
}