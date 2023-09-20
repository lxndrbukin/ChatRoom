export enum UserRoles {
  Admin = 'Administrator',
  Moderator = 'Moderator',
  User = 'User'
}

export interface IUser extends Document {
  userId: number;
  nickname: string;
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