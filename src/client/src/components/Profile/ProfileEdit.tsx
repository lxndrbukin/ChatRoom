import './assets/styles.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const ProfileEdit: React.FC = (): JSX.Element => {
  const queryParams = new URLSearchParams(window.location.search);

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};
