import { HeaderUserNavLink } from '../types';
import { BiSolidHelpCircle, BiSolidLogOut } from 'react-icons/bi';
import { RiSettings3Fill } from 'react-icons/ri';

export const headerUserNavLinks: HeaderUserNavLink[] = [
  {
    name: 'Settings',
    icon: <RiSettings3Fill size={21} />,
    path: '/settings',
  },
  {
    name: 'Help',
    icon: <BiSolidHelpCircle size={21} />,
    path: '#',
  },
  {
    name: 'Sign out',
    icon: <BiSolidLogOut size={21} />,
    path: '/',
  },
];
