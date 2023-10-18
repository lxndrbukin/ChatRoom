import React, { useState } from 'react';

export const HeaderUserStatus: React.FC = (): JSX.Element => {
  const [status, setStatus] = useState('Online');

  const statusTypes = ['Online', 'Busy', 'Away', 'Offline'];

  const renderStatusTypes = (): JSX.Element[] => {
    return statusTypes.map((status: string): JSX.Element => {
      return (
        <div
          onClick={() => setStatus(status)}
          className='header-profile-user-status-type'
        >
          <div className='header-profile-user-status-type-icon'></div>
          <span className='header-profile-user-status-type-name'>{status}</span>
        </div>
      );
    });
  };

  return (
    <div className='header-profile-user-status'>
      <div
        className={`header-profile-user-status-${status.toLowerCase()}`}
      ></div>
      <div className='header-profile-user-status-list'>
        {renderStatusTypes()}
      </div>
    </div>
  );
};
