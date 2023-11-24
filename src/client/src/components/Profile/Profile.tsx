import './assets/styles.scss';
import React, { useEffect } from 'react';
import { ProfileProps } from './types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getProfile } from '../../store';
import { ProfileHeader } from './ProfileHeader';
import { ProfileFriends } from './ProfileFriends';
import { ProfilePostForm } from './ProfilePostForm';
import { ProfilePosts } from './ProfilePosts';

export const Profile: React.FC<ProfileProps> = ({ socket }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { info } = useSelector((state: RootState) => state.profile);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (info) {
      const { firstName, lastName } = info.fullName;
      document.title = `${firstName} ${lastName}`;
    }
  }, [info]);

  return (
    <div className='profile'>
      <ProfileHeader />
      <div className='profile-body'>
        <div className='profile-body-left'>
          <ProfilePostForm />
          <ProfilePosts />
        </div>
        <div className='profile-body-right'>
          <ProfileFriends socket={socket} />
        </div>
      </div>
    </div>
  );
};
