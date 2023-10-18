import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, OnlineStatus } from '../../store';
import { HeaderUserStatusProps } from './types';
import { BiChevronDown } from 'react-icons/bi';

export const HeaderUserStatus: React.FC<HeaderUserStatusProps> = ({
  socket,
}): JSX.Element => {
  const { status, userId } = useSelector(
    (state: RootState) => state.session.userData!
  );
  const [onlineStatus, setOnlineStatus] = useState(status.onlineStatus);

  const handleUpdateUserStatus = (status: OnlineStatus) => {
    setOnlineStatus(status);
    socket.emit('event://update-user-status', {
      userId,
      status,
    });
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
          onClick={() => handleUpdateUserStatus(status)}
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

  return (
    <div className='header-profile-user-status'>
      <div className='header-profile-user-status-name'>
        <span>{onlineStatus}</span> <BiChevronDown />
      </div>
      <div className='header-profile-user-status-list'>
        {renderStatusTypes()}
      </div>
    </div>
  );
};
