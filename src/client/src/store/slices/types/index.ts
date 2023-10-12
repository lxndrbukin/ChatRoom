export enum Slices {
  Session = 'session',
  Chats = 'chats',
  Profile = 'profile',
  Search = 'search',
  FriendsList = 'friendsList',
}

export interface UserData {
  userId: number;
  fullName: {
    firstName: string;
    lastName: string;
  };
  mainPhoto: string;
  domain: string;
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

export interface AboutProfile {
  occupation: {
    desc: string | null;
    type: string | null;
  };
  info: {
    brief: string | null;
  };
}

export interface ProfileInfo {
  userId: number;
  fullName: {
    firstName: string;
    lastName: string;
  };
  mainPhoto: string | null;
  email: string;
  username: string | null;
  age: number | null;
  about: AboutProfile;
  friends: UserData[];
}

export interface ProfileState {
  info: ProfileInfo | undefined;
  friends: UserData[] | undefined;
}

export interface UpdateProfilePayload {
  user: UserData;
  profile: ProfileInfo;
}

export interface RequestsList {
  userId: number;
  checked: boolean;
}

export interface SentRequests {
  userId: number;
}

export interface FriendsRequests {
  friendsList: UserData[];
  requestsList: RequestsList[];
  sentRequests: SentRequests[];
}

export interface Notifications {
  friendRequests: UserData[];
}
