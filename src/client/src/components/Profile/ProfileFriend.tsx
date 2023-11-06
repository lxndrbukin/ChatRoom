import React from 'react';
import { ProfileFriendProps } from './types';

export const ProfileFriend: React.FC<ProfileFriendProps> = ({
  fullName,
  mainPhoto,
}): JSX.Element => {
  return (
    <div className='profile-friend'>
      <img
        className='profile-friend-avatar'
        src={mainPhoto}
        alt={fullName.firstName}
      />
      <div className='profile-friend-fullname'>
        <span>{fullName.firstName}</span>
        <span>{fullName.lastName}</span>
      </div>
    </div>
  );
};
