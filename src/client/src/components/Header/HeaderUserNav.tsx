import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoTriangleDown } from 'react-icons/go';
import { BiSolidMessage } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';
import { RootState } from '../../store';
import { HeaderUserNavProps } from './types';
import { HeaderNotifications } from './HeaderNotifications';
import { HeaderUserNavMenu } from './HeaderUserNavMenu';

export const HeaderUserNav: React.FC<HeaderUserNavProps> = ({
  socket,
}): JSX.Element => {
  const profileFrame = useRef<HTMLDivElement>(null);
  const profileMenu = useRef<HTMLDivElement>(null);
  const statusFrame = useRef<HTMLDivElement>(null);
  const statusMenu = useRef<HTMLDivElement>(null);
  const notificationsFrame = useRef<HTMLDivElement>(null);
  const notificationsBox = useRef<HTMLDivElement>(null);

  const { userData } = useSelector((state: RootState) => state.session);
  const [menu, showMenu] = useState(false);
  const [notifications, showNotifications] = useState(false);

  const { onlineStatus } = userData!.status;

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
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
      <Link to='/IM' className='header-messages-icon'>
        <BiSolidMessage size={26} />
      </Link>
      <div className='header-profile-wrapper'>
        <div
          onClick={() => showMenu(!menu)}
          ref={profileFrame}
          className={`header-profile-icon ${menu ? 'selected' : ''}`}
        >
          <img
            src={userData?.mainPhoto}
            alt={userData?.fullName.firstName}
            className='header-profile-avatar'
          />
          <GoTriangleDown size={16} />
          <div
            className={`header-profile-icon-status ${onlineStatus.toLowerCase()}`}
          ></div>
        </div>
        <HeaderUserNavMenu
          socket={socket}
          showMenu={menu}
          handleInsideClick={() => showMenu(!menu)}
          menuRef={profileMenu}
          statusFrameRef={statusFrame}
          statusMenuRef={statusMenu}
          userData={userData!}
        />
      </div>
    </div>
  );
};
