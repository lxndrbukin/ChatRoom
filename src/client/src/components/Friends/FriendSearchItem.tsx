import React from 'react';
import { FriendSearchItemProps } from './types';

export const FriendSearchItem: React.FC<FriendSearchItemProps> = ({
  userData,
}): JSX.Element => {
  return <div>{userData.nickname}</div>;
};
