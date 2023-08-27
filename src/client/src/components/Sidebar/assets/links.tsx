import { SidebarLink } from '../types';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import { BiSolidMessage } from 'react-icons/bi';
import { RiSettings3Fill } from 'react-icons/ri';
import { ImEnter } from 'react-icons/im';

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
    icon: <ImEnter size={24} />,
    path: '/signup',
    ifLoggedIn: false,
  },
];

export const additionalLinks: SidebarLink[] = [
  { name: 'Settings', icon: <RiSettings3Fill size={24} />, path: '/settings' },
];
