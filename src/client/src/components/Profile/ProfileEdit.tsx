import './assets/styles.scss';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ProfileEditMenu } from './ProfileEditMenu';

export const ProfileEdit: React.FC = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Edit Profile';
  }, []);

  return (
    <div className='profile-edit-wrapper'>
      <Outlet />
      <ProfileEditMenu />
    </div>
  );
};
