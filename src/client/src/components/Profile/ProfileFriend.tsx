import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileFriendProps } from './types';

export const ProfileFriend: React.FC<ProfileFriendProps> = ({
  userId,
  fullName,
  mainPhoto,
  status,
}): JSX.Element => {
  const { onlineStatus } = status;

  const renderStatus = (): JSX.Element | null => {
    switch (onlineStatus) {
      case 'Offline':
        return null;
      default:
        return (
          <div
            className={`profile-friend-status ${onlineStatus.toLowerCase()}`}
          ></div>
        );
    }
  };

  return (
    <Link to={`/profile/${userId}`} className='profile-friend'>
      <div className='profile-friend-avatar-wrapper'>
        <img
          className='profile-friend-avatar'
          src={mainPhoto}
          alt={fullName.firstName}
        />
        {renderStatus()}
      </div>
      <div className='profile-friend-fullname'>
        <span className='profile-friend-name'>{fullName.firstName}</span>
      </div>
    </Link>
  );
};
