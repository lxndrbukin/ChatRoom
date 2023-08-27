export enum Slices {
  Session = 'session'
}

export interface UserData {
  email: string;
  nickname: string;
  role: string;
}

export interface UserState {
  isLoggedIn: boolean;
  userData: UserData | undefined;
}