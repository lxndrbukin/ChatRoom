import './assets/styles.scss';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdChatboxes } from 'react-icons/io';
import { GoTriangleDown } from 'react-icons/go';
import { BiSolidMessage } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';
import { RootState } from '../../store';
import { HeaderSearch } from './HeaderSearch';
import { HeaderUserNav } from './HeaderUserNav';
import { HeaderNotifications } from './HeaderNotifications';

export const Header: React.FC = (): JSX.Element => {
  const profileFrame = useRef<HTMLDivElement>(null);
  const profileMenu = useRef<HTMLDivElement>(null);
  const notificationsFrame = useRef<HTMLDivElement>(null);
  const notificationsBox = useRef<HTMLDivElement>(null);

  const [menu, showMenu] = useState(false);
  const [notifications, showNotifications] = useState(false);

  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e: MouseEvent): void => {
    if (
      profileFrame &&
      !profileFrame.current?.contains(e.target as Element) &&
      !profileMenu.current?.contains(e.target as Element)
    ) {
      showMenu(false);
    }
    if (
      notificationsFrame &&
      !notificationsFrame.current?.contains(e.target as Element) &&
      !notificationsBox.current?.contains(e.target as Element)
    ) {
      showNotifications(false);
    }
  };

  const renderUserNav = (): JSX.Element => {
    return (
      <div className='header-profile'>
        <div className='header-notifications-wrapper'>
          <div
            onClick={() => showNotifications(!notifications)}
            ref={notificationsFrame}
            className='header-notifications-icon'
          >
            <FaBell size={25} />
          </div>
          <HeaderNotifications
            showNotifications={notifications}
            notificationsBoxRef={notificationsBox}
            handleInsideClick={() => showNotifications(!notifications)}
          />
        </div>
        <Link to='/IM' className='header-profile-icon'>
          <BiSolidMessage size={26} />
        </Link>
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
            handleInsideClick={() => showMenu(!menu)}
            menuRef={profileMenu}
            userData={userData!}
          />
        </div>
      </div>
    );
  };

  return (
    <header className='header-wrapper'>
      <div className='header'>
        <Link className='header-logo' to='/'>
          <IoMdChatboxes size={35} />
          <span className='header-logo-text'>ChatRoom</span>
        </Link>
        <HeaderSearch />
        {isLoggedIn ? renderUserNav() : null}
      </div>
    </header>
  );
};
