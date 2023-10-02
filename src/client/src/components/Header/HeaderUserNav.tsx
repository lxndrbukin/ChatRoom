import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, logout } from '../../store';
import { Link } from 'react-router-dom';
import { HeaderUserNavProps } from './types';
import { headerUserNavLinks } from './assets/links';

export const HeaderUserNav: React.FC<HeaderUserNavProps> = ({
  userData,
  menuRef,
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
      if (link.name === 'Sign out') {
        return (
          <div
            onClick={(e) => {
              handleLogout();
              handleInsideClick(e);
            }}
            className='header-user-nav-link'
            key={link.name}
          >
            {link.icon}
            <span className='header-user-nav-link-text'>{link.name}</span>
          </div>
        );
      }
      return (
        <Link
          onClick={handleInsideClick}
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
            onClick={handleInsideClick}
            to={`/profile/${userId}`}
            className='header-user-nav-data'
          >
            <img
              className='header-user-nav-avatar'
              src={mainPhoto}
              alt={`${firstName} ${lastName}`}
            />
            <span className='header-user-nav-fullname'>
              {firstName} {lastName}
            </span>
          </Link>
        </div>
        <div className='header-user-nav-links'>{renderLinks()}</div>
      </nav>
    );
  }
  return null;
};
