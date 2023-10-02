import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderSearchBoxItemProps } from './types';

export const HeaderSearchBoxItem: React.FC<HeaderSearchBoxItemProps> = ({
  userId,
  fullName,
  mainPhoto,
}): JSX.Element => {
  return (
    <Link to={`/profile/${userId}`} className='header-search-box-item'>
      <img
        src={mainPhoto}
        alt={fullName.firstName}
        className='header-search-box-item-avatar'
      />
      <span className='header-search-box-item-fullname'></span>
    </Link>
  );
};
