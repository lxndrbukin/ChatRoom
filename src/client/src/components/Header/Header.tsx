import './assets/styles.scss';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdChatboxes } from 'react-icons/io';
import { GoTriangleDown } from 'react-icons/go';
import { AppDispatch, RootState, logout } from '../../store';
import { HeaderSearch } from './HeaderSearch';
import { HeaderUserNav } from './HeaderUserNav';

export const Header: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );

  const logoutUser = (): void => {
    dispatch(logout());
  };

  const renderUserNav = (): JSX.Element => {
    return (
      <nav className='header-profile'>
        <div className='header-profile-wrapper'>
          <div className='header-profile-icon'>
            <img
              src={userData?.mainPhoto}
              alt={userData?.fullName.firstName}
              className='header-profile-avatar'
            />
            <GoTriangleDown size={16} />
          </div>
          <HeaderUserNav userData={userData!} />
        </div>
      </nav>
    );
  };

  return (
    <header className='header'>
      <Link className='header-logo' to='/'>
        <IoMdChatboxes size={35} />
        <span className='header-logo-text'>ChatRoom</span>
      </Link>
      <HeaderSearch />
      {isLoggedIn ? renderUserNav() : null}
    </header>
  );
};
