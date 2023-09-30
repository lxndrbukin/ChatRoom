import { Socket } from 'socket.io-client';

export interface AddFriendProps {
  socket: Socket;
}

export interface UserData {
  userId: number;
  email: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  domain: string;
}

export interface FriendSearchItemProps {
  userData: UserData;
}