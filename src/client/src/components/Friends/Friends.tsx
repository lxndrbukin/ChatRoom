import React from 'react';
import { Outlet } from 'react-router-dom';

export const Friends: React.FC = (): JSX.Element => {
  return (
    <div className='friends'>
      <Outlet />
    </div>
  );
};
