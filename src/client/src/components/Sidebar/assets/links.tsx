import { SidebarLink } from '../types';
import { FaBell, FaUserPlus, FaUsers, FaUser } from 'react-icons/fa';
import { BiSolidMessage } from 'react-icons/bi';
import { RiSettings3Fill, RiLoginBoxLine } from 'react-icons/ri';

export const mainLinks: SidebarLink[] = [
  {
    name: 'My Profile',
    icon: <FaUser size={21} />,
    path: '/profile',
    ifLoggedIn: true,
  },
  {
    name: 'Friends',
    icon: <FaUsers size={24} />,
    path: '/friends',
    ifLoggedIn: true,
  },
  {
    name: 'Add Friend',
    icon: <FaUserPlus size={24} />,
    path: '/friends/add',
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
    name: 'Login',
    icon: <RiLoginBoxLine size={24} />,
    path: '/login',
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
];
