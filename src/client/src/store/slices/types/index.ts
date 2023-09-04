export enum Slices {
  Session = 'session',
  Chats = 'chats'
}

export interface UserData {
  userId: number;
  email: string;
  nickname: string;
  role: string;
}

export interface UserState {
  isLoggedIn: boolean;
  userData: UserData | undefined;
  message: string | undefined;
}

export interface Chat {
  chatId: string;
  name: string;
  password?: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  userId: string,
  nickname: string,
  message: string;
}

export interface ChatsState {
  currentChat: ChatMessage[],
  chatsList: Chat[];
}