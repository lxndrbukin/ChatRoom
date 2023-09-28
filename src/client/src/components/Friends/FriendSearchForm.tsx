import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, findUser } from '../../store';
import { AddFriendProps } from './types';

export const FriendSearchForm: React.FC<AddFriendProps> = ({
  socket,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchReq, setSearchReq] = useState('');

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (searchReq.length) {
        dispatch(findUser(searchReq));
      }
    }, 500);
    return () => clearTimeout(timeOut);
  }, [searchReq, dispatch]);

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
