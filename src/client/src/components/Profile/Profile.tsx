import './assets/styles.scss';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, getProfile, getProfileFriends } from '../../store';
import { ProfileHeader } from './ProfileHeader';
import { ProfileFriends } from './ProfileFriends';

export const Profile: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
      dispatch(getProfileFriends(JSON.parse(userId)));
    }
  }, [dispatch, userId]);

  return (
    <div className='profile'>
      <ProfileHeader />
      <ProfileFriends />
    </div>
  );
};
