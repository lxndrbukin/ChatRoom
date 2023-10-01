import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderUserNavProps } from './types';
import { headerUserNavLinks } from './assets/links';

export const HeaderUserNav: React.FC<HeaderUserNavProps> = ({
  userData,
}): JSX.Element => {
  const { firstName, lastName } = userData.fullName;
  const { mainPhoto, userId } = userData;

  const renderLinks = (): JSX.Element[] => {
    return headerUserNavLinks.map((link) => {
      return (
        <Link className='header-user-nav-link' key={link.name} to={link.path}>
          {link.icon}
          <span className='header-user-nav-link-text'>{link.name}</span>
        </Link>
      );
    });
  };

  return (
    <nav className='header-user-nav'>
      <div className='header-user-nav-data-wrapper'>
        <Link to={`/profile/${userId}`} className='header-user-nav-data'>
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
};
