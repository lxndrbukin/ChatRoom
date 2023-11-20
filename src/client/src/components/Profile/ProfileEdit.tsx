import './assets/styles.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ProfileEditMenu } from './ProfileEditMenu';

export const ProfileEdit: React.FC = (): JSX.Element => {
  const queryParams = new URLSearchParams(window.location.search);

  return (
    <div className='profile-edit-wrapper'>
      <Outlet />
      <ProfileEditMenu />
    </div>
  );
};
