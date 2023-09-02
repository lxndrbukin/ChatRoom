import './assets/styles.scss';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, logout } from '../../store';
import { Link } from 'react-router-dom';
import { SidebarLink } from './types';
import { mainLinks, additionalLinks } from './assets/links';
import { IoMdChatboxes } from 'react-icons/io';

export const Sidebar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.session);

  const logoutUser = (): void => {
    dispatch(logout());
  };

  const renderLinks = (links: SidebarLink[]): Array<JSX.Element | null> => {
    return links.map((link: SidebarLink): JSX.Element | null => {
      if (link.ifLoggedIn === isLoggedIn) {
        if (link.path !== '/logout') {
          return (
            <li className='sidebar-link' key={link.name}>
              <Link to={link.path}>{link.icon}</Link>
            </li>
          );
        }
        return (
          <li onClick={logoutUser} className='sidebar-link' key={link.name}>
            {link.icon}
          </li>
        );
      }
      return null;
    });
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-logo'>
        <Link to='/'>
          <IoMdChatboxes size={50} />
        </Link>
      </div>
      <nav className='sidebar-links'>
        <ul className='sidebar-links-list'>{renderLinks(mainLinks)}</ul>
      </nav>
      <nav className='sidebar-links additional'>
        <ul className='sidebar-links-list'>{renderLinks(additionalLinks)}</ul>
      </nav>
    </div>
  );
};
