export enum Schemas {
  Chat = 'chat',
  User = 'user',
  FriendsList = 'friendsList',
  Profile = 'profile'
}

export enum UserRoles {
  Admin = 'Administrator',
  Moderator = 'Moderator',
  User = 'User',
}

export enum UserStatus {
  Online = 'Online',
  Away = 'Away',
  Busy = 'Busy',
  Offline = 'Offline'
}

export interface IUser extends Document {
  userId: number;
  fullName: {
    firstName: string;
    lastName: string;
  };
  mainPhoto: string;
  username: string;
  email: string;
  password: string;
  status: {
    lastSeen: number;
    previousOnlineStatus: UserStatus;
    onlineStatus: UserStatus;
  },
  signedUp: number;
}

export interface ChatMemberId {
  userId: number;
}

export interface ChatMessage {
  userId: number;
  message: {
    id: string;
    content: string;
  };
  sentAt: number;
  read: boolean;
}

export interface IChat extends Document {
  chatId: string;
  memberIds: ChatMemberId[];
  messages: ChatMessage[];
  password?: string;
}

export interface AboutProfile {
  occupation: {
    desc: string;
    type: string;
  };
  info: {
    brief: string;
  };
}

export interface IProfile extends Document {
  userId: number;
  fullName: {
    firstName: string;
    lastName: string;
  };
  mainPhoto: string;
  email: string;
  username: string;
  dob: {
    dd: string;
    mm: string;
    yyyy: string;
  };
  about: AboutProfile;
  status: {
    lastSeen: number;
    previousOnlineStatus: UserStatus;
    onlineStatus: UserStatus;
  },
  signedUp: number;
}

export interface UserId {
  userId: number;
}

export interface Requests extends UserId {
  checked: boolean;
}

export interface IFriendsList extends Document {
  userId: number;
  friendsList: UserId[];
  requestsList: UserId[];
  sentRequests: UserId[];
}
