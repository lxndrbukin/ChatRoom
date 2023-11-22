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

export interface ProfileEditProps {
  children: ReactNode;
}

export interface ProfileEditMainProps {
  header: string;
  children: ReactNode;
}
export interface ProfileEditMainFormProps {

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
  handleClose: MouseEventHandler;
  handleSetFile: ChangeEventHandler;
}

export interface ProfileEditFormProps {
  handleSubmit: FormEventHandler;
  children?: ReactNode;
}

export interface ProfileEditUserInfoProps {
  firstName: string;
  lastName: string;
  handleToggleModal: Function;
}

export interface ProfileEditSelectProps {
  name: string;
  options: number[] | string[];
}