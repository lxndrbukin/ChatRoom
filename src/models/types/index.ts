export enum UserRoles {
  Admin = 'Administrator',
  Moderator = 'Moderator',
  User = 'User'
}

export interface IUser extends Document {
  nickname: string;
  password: string;
  role: UserRoles;
}