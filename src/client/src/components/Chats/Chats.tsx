import './assets/styles.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Chats: React.FC = (): JSX.Element => {
  return (
    <div className='chats'>
      <Outlet />
    </div>
  );
};
