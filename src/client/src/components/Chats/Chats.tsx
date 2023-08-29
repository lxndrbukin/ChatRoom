import React, { useEffect } from 'react';
import { ChatsProps } from './types';
import { Outlet } from 'react-router-dom';

export const Chats: React.FC = (): JSX.Element => {
  return (
    <div className='chats'>
      <Outlet />
    </div>
  );
};
