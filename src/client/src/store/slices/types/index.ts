export enum Slices {
  Session = 'session',
  Chats = 'chats',
  Profile = 'profile',
  Search = 'search',
}

export interface UserData {
  userId: number;
  email: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  mainPhoto: string;
  domain: string;
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
  fullName: {
    firstName: string;
    lastName: string;
  };
  username: string;
  message: string;
  sentAt: number;
}

export interface SendMessageRes extends ChatMessage {
  chatId: string;
}

export interface ChatsState {
  currentChat: Chat | undefined;
  chatsList: ChatsListItem[];
}

export interface SearchState {
  users: UserData[];
}

export interface ProfileInfo {
  userData: {
    fullName: {
      firstName: string;
      lastName: string;
    };
    age: number | null;
    username: string | null;
  };
  mainPhoto: string | null;
  about: {
    occupation: {
      desc: string | null;
      type: string | null;
    };
    info: {
      brief: string | null;
    };
  };
}

export interface ProfileState {
  info: ProfileInfo | undefined;
}
