import './assets/styles.scss';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, logout } from '../../store';
import { Link } from 'react-router-dom';
import { SidebarLink } from './types';
import { mainLinks, additionalLinks } from './assets/links';
import { IoMdChatboxes } from 'react-icons/io';
import { RiLogoutBoxLine } from 'react-icons/ri';

export const Sidebar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, userData } = useSelector(
    (state: RootState) => state.session
  );

  const logoutUser = (): void => {
    dispatch(logout());
  };

  const renderLinks = (links: SidebarLink[]): Array<JSX.Element | null> => {
    return links.map((link: SidebarLink): JSX.Element | null => {
      if (link.ifLoggedIn === isLoggedIn) {
        return (
          <li title={link.name} className='sidebar-link' key={link.name}>
            <Link to={link.path}>
              {link.icon} <span className='sidebar-link-name'>{link.name}</span>
            </Link>
          </li>
        );
      }
      return null;
    });
  };

  const renderUserNav = (): JSX.Element => {
    return (
      <nav className='sidebar-profile'>
        <Link to='/profile' className='user-link'>
          <img
            src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
            style={{ height: '30px' }}
            alt={userData?.nickname}
          />
          <span className='username'>{userData?.nickname}</span>
        </Link>
        <RiLogoutBoxLine onClick={logoutUser} size={22} />
      </nav>
    );
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
      {isLoggedIn ? renderUserNav() : null}
    </div>
  );
};
