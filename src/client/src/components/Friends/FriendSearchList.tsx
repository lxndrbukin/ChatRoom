import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserData } from './types';
import { FriendSearchItem } from './FriendSearchItem';

export const FriendSearchList: React.FC = (): JSX.Element => {
  const { users } = useSelector((state: RootState) => state.search);

  const renderSearchList = (): JSX.Element[] => {
    return users.map((user: UserData) => {
      return <FriendSearchItem key={user.userId} userData={user} />;
    });
  };

  return <div className='friend-search-list'>{renderSearchList()}</div>;
};
