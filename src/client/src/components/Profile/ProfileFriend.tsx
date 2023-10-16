import React from 'react';
import { ProfileFriendProps } from './types';

export const ProfileFriend: React.FC<ProfileFriendProps> = ({
  fullName,
  mainPhoto,
}): JSX.Element => {
  const { firstName, lastName } = fullName;
  return (
    <div className='profile-friend'>
      <img className='profile-friend-avatar' src={mainPhoto} alt={firstName} />
      <div className='profile-friend-fullname'>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </div>
    </div>
  );
};
