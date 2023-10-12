import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const HeaderNotifications: React.FC = (): JSX.Element => {
  const { requestsList } = useSelector((state: RootState) => state.friends);

  return <div className='header-notifications'></div>;
};
