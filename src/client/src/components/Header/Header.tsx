import './assets/styles.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HeaderProps } from './types';
import { IoMdChatboxes } from 'react-icons/io';
import { RootState } from '../../store';
import { HeaderSearch } from './HeaderSearch';
import { HeaderUserNav } from './HeaderUserNav';

export const Header: React.FC<HeaderProps> = ({ socket }): JSX.Element => {
  const { isLoggedIn } = useSelector((state: RootState) => state.session);

  return (
    <header className='header-wrapper'>
      <div className='header'>
        <Link className='header-logo' to='/'>
          <IoMdChatboxes size={35} />
          <span className='header-logo-text'>ChatRoom</span>
        </Link>
        {isLoggedIn && <HeaderSearch />}
        {isLoggedIn && <HeaderUserNav socket={socket} />}
      </div>
    </header>
  );
};
