export enum UserRoles {
  Admin = 'Administrator',
  Moderator = 'Moderator',
  User = 'User',
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
  role: UserRoles;
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
}

export interface Friend {
  userId: number;
  fullName: {
    firstName: string;
    lastName: string;
  };
  photo: string;
}

export interface IFriendsList extends Document {
  userId: number;
  friendsList: Friend[];
  requestsList: Friend[];
  sentRequests: Friend[];
}
