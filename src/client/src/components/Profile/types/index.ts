import { Socket } from 'socket.io-client';

export interface ProfileProps {
  socket: Socket;
}

export interface ProfileHeaderButtonsProps {
  profileUserData: {
    userId: number;
    fullName: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface ProfileFriendsProps {
  socket: Socket;
}

export interface ProfileFriendProps {
  socket: Socket;
  userId: number;
}
