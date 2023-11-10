import { Socket } from 'socket.io-client';
import { ChangeEventHandler } from 'react';

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
  children?: React.ReactNode;
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


export interface ProfileEditInputProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}