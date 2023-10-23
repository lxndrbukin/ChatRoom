import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, OnlineStatus } from '../../store';
import { HeaderUserStatusProps } from './types';
import { BiChevronDown } from 'react-icons/bi';

export const HeaderUserNavStatus: React.FC<HeaderUserStatusProps> = ({
  socket,
  statusFrameRef,
  statusMenuRef,
}): JSX.Element => {
  const { status, userId } = useSelector(
    (state: RootState) => state.session.userData!
  );
  const [onlineStatus, setOnlineStatus] = useState(status.onlineStatus);
  const [dropdown, showDropdown] = useState(false);

  const handleUpdateUserStatus = (userStatus: OnlineStatus) => {
    setOnlineStatus(userStatus);
    socket.emit('event://update-user-status', {
      userId,
      onlineStatus: userStatus,
      previousOnlineStatus: userStatus,
    });
    showDropdown(false);
  };

  const statusTypes = [
    OnlineStatus.Online,
    OnlineStatus.Busy,
    OnlineStatus.Away,
    OnlineStatus.Offline,
  ];

  const renderStatusTypes = (): JSX.Element[] => {
    return statusTypes.map((status: OnlineStatus): JSX.Element => {
      return (
        <div
          key={status}
          onClick={() => {
            handleUpdateUserStatus(status);
          }}
          className='header-profile-user-status-type'
        >
          <div
            className={`header-profile-user-status-type-icon ${status.toLowerCase()}`}
          ></div>
          <span className='header-profile-user-status-type-name'>{status}</span>
        </div>
      );
    });
  };

  const renderStatusDropdown = (): JSX.Element => {
    return (
      <div ref={statusMenuRef} className='header-profile-user-status-list'>
        {renderStatusTypes()}
      </div>
    );
  };

  return (
    <div className='header-profile-user-status'>
      <div
        ref={statusFrameRef}
        onClick={() => showDropdown(!dropdown)}
        className='header-profile-user-status-name'
      >
        <span>{onlineStatus}</span> <BiChevronDown />
      </div>
      {dropdown && renderStatusDropdown()}
    </div>
  );
};
