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

export interface ButtonItemsProps {
  userId?: number;
}

export interface RequestButtonItemsProps extends ButtonItemsProps {
  handleFriendStatus: Function;
}

export interface ProfileFriendsProps {
  socket: Socket;
}

export interface ProfileFriendProps {
  userId: number;
  fullName: {
    firstName: string;
    lastName: string;
  };
  mainPhoto: string;
  status: {
    onlineStatus: string;
  };
}
