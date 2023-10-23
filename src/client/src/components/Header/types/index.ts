import React, { MouseEventHandler, ReactNode } from 'react';
import { UserData } from '../../../store';
import { Socket } from 'socket.io-client';

export interface HeaderProps {
  socket: Socket;
}

export interface HeaderUserNavLink {
  name: string;
  icon: JSX.Element;
  path: string;
}

export interface HeaderUserNavProps {
  socket: Socket;
}

export interface HeaderUserNavMenuProps {
  userData: UserData;
  menuRef: React.RefObject<HTMLDivElement>;
  statusFrameRef: React.RefObject<HTMLDivElement>;
  statusMenuRef: React.RefObject<HTMLDivElement>;
  showMenu: boolean;
  handleInsideClick: MouseEventHandler<Element>;
  socket: Socket;
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

export interface HeaderNotificationsProps {
  handleInsideClick: MouseEventHandler<Element>;
  notificationsBoxRef: React.RefObject<HTMLDivElement>;
  showNotifications: boolean;
}

export interface HeaderNotificationProps {
  children: ReactNode;
}

export interface HeaderUserStatusProps {
  socket: Socket;
  statusFrameRef: React.RefObject<HTMLDivElement>;
  statusMenuRef: React.RefObject<HTMLDivElement>;
}
