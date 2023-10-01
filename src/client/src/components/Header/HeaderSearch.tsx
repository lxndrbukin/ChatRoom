import React from 'react';
import { BsSearch } from 'react-icons/bs';

export const HeaderSearch: React.FC = (): JSX.Element => {
  return (
    <form className='header-search'>
      <BsSearch />
      <input placeholder='Search...' />
    </form>
  );
};
