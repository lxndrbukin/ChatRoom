import { SidebarLink } from '../types';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import { BiSolidMessage } from 'react-icons/bi';
import { RiSettings3Fill } from 'react-icons/ri';

export const mainLinks: SidebarLink[] = [
  { name: 'Profile', icon: <FaUserCircle />, path: '/' },
  { name: 'Notifications', icon: <FaBell />, path: '/notifications' },
  { name: 'Messages', icon: <BiSolidMessage />, path: '/IM' },
];

export const additionalLinks: SidebarLink[] = [
  { name: 'Settings', icon: <RiSettings3Fill />, path: '/settings' },
];
