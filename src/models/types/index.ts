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
    lastSeen: Date;
    previousOnlineStatus: UserStatus;
    onlineStatus: UserStatus;
  },
  signedUp: Date;
}

export interface ChatMember {
  userId: number;
  nickname: string;
  role: UserRoles;
}

export interface ChatMessage {
  messageId: string;
  userId: number;
  nickname: string;
  message: string;
}

export interface IChat extends Document {
  chatId: string;
  chatName: string;
  members: ChatMember[];
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
  age: number;
  about: AboutProfile;
  status: {
    lastSeen: Date;
    previousOnlineStatus: UserStatus;
    onlineStatus: UserStatus;
  },
  signedUp: Date;
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
