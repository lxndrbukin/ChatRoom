import { Socket } from 'socket.io-client';

export interface AddFriendProps {
  socket: Socket;
}

export interface UserData {
  userId: number;
  email: string;
  nickname: string;
}

export interface FriendSearchItemProps {
  userData: UserData;
}