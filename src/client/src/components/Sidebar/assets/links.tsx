import { SidebarLink } from '../types';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import { BiSolidMessage } from 'react-icons/bi';
import {
  RiSettings3Fill,
  RiLoginBoxLine,
  RiLogoutBoxLine,
} from 'react-icons/ri';

export const mainLinks: SidebarLink[] = [
  {
    name: 'Profile',
    icon: <FaUserCircle size={24} />,
    path: '/',
    ifLoggedIn: true,
  },
  {
    name: 'Notifications',
    icon: <FaBell size={24} />,
    path: '/notifications',
    ifLoggedIn: true,
  },
  {
    name: 'Messages',
    icon: <BiSolidMessage size={24} />,
    path: '/IM',
    ifLoggedIn: true,
  },
  {
    name: 'Sign Up',
    icon: <RiLoginBoxLine size={24} />,
    path: '/signup',
    ifLoggedIn: false,
  },
];

export const additionalLinks: SidebarLink[] = [
  {
    name: 'Settings',
    icon: <RiSettings3Fill size={24} />,
    path: '/settings',
    ifLoggedIn: true,
  },
  {
    name: 'Logout',
    icon: <RiLogoutBoxLine size={24} />,
    path: '/logout',
    ifLoggedIn: true,
  },
];
