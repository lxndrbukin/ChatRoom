import React from 'react';
import { FriendSearchItemProps } from './types';

export const FriendSearchItem: React.FC<FriendSearchItemProps> = ({
  userData,
}): JSX.Element => {
  const { firstName } = userData.fullName;
  return <div>{firstName}</div>;
};
