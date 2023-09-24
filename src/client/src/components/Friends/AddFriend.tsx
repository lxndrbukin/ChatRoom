import React from 'react';
import { AddFriendProps } from './types';

export const AddFriend: React.FC<AddFriendProps> = ({
  socket,
}): JSX.Element => {
  return (
    <form className='add-friend-form'>
      <input name='findFriend' placeholder='Search...' />
      <button>Search</button>
    </form>
  );
};
