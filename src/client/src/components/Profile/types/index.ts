import { Socket } from 'socket.io-client';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, ReactNode } from 'react';

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

export interface ProfileEditModalProps {
  isOpen: boolean;
  styles?: {
    [key: string]: string | object;
  };
  handleClose: MouseEventHandler;
  handleSetFile: ChangeEventHandler;
}

export interface ProfileEditFormProps {
  handleSubmit: FormEventHandler;
  children?: ReactNode;
}

export interface ProfileEditMainProps {
  firstName: string;
  lastName: string;
  handleToggleModal: Function;
}

export interface ProfileEditSelectProps {
  options: string[];
}