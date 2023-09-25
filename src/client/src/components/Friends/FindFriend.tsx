import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, findUser, setSearchReq } from '../../store';
import { AddFriendProps } from './types';

export const FindFriend: React.FC<AddFriendProps> = ({
  socket,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchReq } = useSelector((state: RootState) => state.search);

  const handleSetSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as typeof e.target & {
      searchReq: { value: string };
    };
    dispatch(setSearchReq(target.searchReq.value));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    const target = e.target as typeof e.target & {
      searchReq: { value: string };
    };
    dispatch(findUser(target.searchReq.value));
  };

  return (
    <form onSubmit={handleSearch} className='add-friend-form'>
      <input
        onChange={handleSetSearch}
        name='searchReq'
        placeholder='Search...'
      />
      <button>Search</button>
    </form>
  );
};
