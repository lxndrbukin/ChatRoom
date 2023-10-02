import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { HeaderSearchBox } from './HeaderSearchBox';

export const HeaderSearch: React.FC = (): JSX.Element => {
  return (
    <div className='header-search'>
      <form className='header-search-form'>
        <BsSearch />
        <input placeholder='Search...' />
      </form>
      <HeaderSearchBox />
    </div>
  );
};
