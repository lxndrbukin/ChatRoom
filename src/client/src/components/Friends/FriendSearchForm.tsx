import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, findUser } from '../../store';
import { AddFriendProps } from './types';

export const FriendSearchForm: React.FC<AddFriendProps> = ({
  socket,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchReq, setSearchReq] = useState('');

  useEffect(() => {}, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(findUser(searchReq));
  };

  return (
    <form onSubmit={handleSearch} className='add-friend-form'>
      <input
        onChange={(e) => setSearchReq(e.target.value)}
        name='searchReq'
        placeholder='Search...'
      />
      <button>Search</button>
    </form>
  );
};
