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

export interface ChatsListItem {
  chatId: string;
  chatName: string;
  password?: string;
}

export interface Chat {
  chatId: string;
  members: UserData[];
  messages: ChatMessage[];
}

export interface ChatMessage {
  userId: string,
  nickname: string,
  message: string;
}

export interface ChatsState {
  currentChat: Chat | undefined,
  chatsList: ChatsListItem[];
}