import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const ProfileFriends: React.FC = (): JSX.Element => {
  const { friends } = useSelector((state: RootState) => state.profile);

  return <div className='profile-friends'></div>;
};
