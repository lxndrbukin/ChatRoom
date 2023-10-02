import './assets/styles.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdChatboxes } from 'react-icons/io';
import { GoTriangleDown } from 'react-icons/go';
import { AppDispatch, RootState, logout } from '../../store';
import { HeaderSearch } from './HeaderSearch';
import { HeaderUserNav } from './HeaderUserNav';

export const Header: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const profileFrame = useRef<HTMLDivElement>(null);
  const profileMenu = useRef<HTMLDivElement>(null);

  const [menu, showMenu] = useState(false);

  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
  }, []);

  const logoutUser = (): void => {
    dispatch(logout());
  };

  const handleInsideClick = () => {
    showMenu(!menu);
  };

  const handleOutsideClick = (e: MouseEvent): void => {
    if (
      profileFrame &&
      !profileFrame.current?.contains(e.target as Element) &&
      !profileMenu.current?.contains(e.target as Element)
    ) {
      showMenu(false);
    }
  };

  const renderUserNav = (): JSX.Element => {
    return (
      <nav className='header-profile'>
        <div className='header-profile-wrapper'>
          <div
            onClick={() => showMenu(!menu)}
            ref={profileFrame}
            className='header-profile-icon'
          >
            <img
              src={userData?.mainPhoto}
              alt={userData?.fullName.firstName}
              className='header-profile-avatar'
            />
            <GoTriangleDown size={16} />
          </div>
          <HeaderUserNav
            showMenu={menu}
            handleInsideClick={handleInsideClick}
            menuRef={profileMenu}
            userData={userData!}
          />
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
