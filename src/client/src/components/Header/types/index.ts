import React, { MouseEventHandler } from 'react';
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
  users: UserData[];
}

export interface HeaderSearchBoxItemProps {
  userId: number;
  fullName: {
    firstName: string;
    lastName: string;
  };
  mainPhoto: string;
}