import React, { MouseEventHandler, ReactNode } from 'react';
import { UserData } from '../../../store';

export interface HeaderUserNavLink {
  name: string;
  icon: JSX.Element;
  path: string;
}

export interface HeaderUserNavProps {
  userData: UserData;
  menuRef: React.RefObject<HTMLDivElement>;
  showMenu: boolean;
  handleInsideClick: MouseEventHandler<Element>;
}

export interface HeaderSearchBoxProps {
  searchBoxRef: React.RefObject<HTMLDivElement>;
  handleInsideClick: MouseEventHandler<Element>;
}

export interface HeaderSearchBoxItemProps {
  userId: number;
  fullName: {
    firstName: string;
    lastName: string;
  };
  mainPhoto: string;
}

export interface HeaderNotificationProps {
  children: ReactNode;
}
