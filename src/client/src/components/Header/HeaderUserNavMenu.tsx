import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, logout } from '../../store';
import { Link } from 'react-router-dom';
import { HeaderUserNavMenuProps } from './types';
import { headerUserNavLinks } from './assets/links';
import { HeaderUserNavStatus } from './HeaderUserNavStatus';

export const HeaderUserNavMenu: React.FC<HeaderUserNavMenuProps> = ({
  socket,
  userData,
  menuRef,
  statusFrameRef,
  statusMenuRef,
  handleInsideClick,
  showMenu,
}): JSX.Element | null => {
  const dispatch = useDispatch<AppDispatch>();

  const { firstName, lastName } = userData.fullName;
  const { mainPhoto, userId } = userData;

  const handleLogout = (): void => {
    dispatch(logout());
  };

  const renderLinks = (): JSX.Element[] => {
    return headerUserNavLinks.map((link) => {
      return (
        <Link
          onClick={(e) => {
            if (link.path === '/') {
              handleLogout();
            }
            handleInsideClick(e);
          }}
          className='header-user-nav-link'
          key={link.name}
          to={link.path}
        >
          {link.icon}
          <span className='header-user-nav-link-text'>{link.name}</span>
        </Link>
      );
    });
  };

  if (showMenu) {
    return (
      <nav ref={menuRef} className='header-user-nav'>
        <div className='header-user-nav-data-wrapper'>
          <Link
            to={`/profile/${userId}`}
            onClick={handleInsideClick}
            className='header-user-nav-data'
          >
            <img
              className='header-user-nav-avatar'
              src={mainPhoto}
              alt={firstName}
            />
            <span className='header-user-nav-fullname'>
              {firstName} {lastName}
            </span>
          </Link>
          <HeaderUserNavStatus
            statusFrameRef={statusFrameRef}
            statusMenuRef={statusMenuRef}
            socket={socket}
          />
        </div>
        <div className='header-user-nav-links'>{renderLinks()}</div>
      </nav>
    );
  }
  return null;
};
