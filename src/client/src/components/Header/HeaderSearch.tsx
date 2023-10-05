import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, findUser } from '../../store';
import { BsSearch } from 'react-icons/bs';
import { HeaderSearchBox } from './HeaderSearchBox';

export const HeaderSearch: React.FC = (): JSX.Element => {
  const searchInput = useRef<HTMLInputElement>(null);
  const searchFrame = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const [searchReq, setSearchReq] = useState('');
  const [searchBox, showSearchBox] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    const timeOut = setTimeout(() => {
      if (searchReq.length) {
        dispatch(findUser(searchReq));
        showSearchBox(true);
      }
    }, 500);
    return () => clearTimeout(timeOut);
  }, [searchReq, dispatch]);

  const handleOutsideClick = (e: MouseEvent): void => {
    if (
      searchFrame &&
      !searchFrame.current?.contains(e.target as Element) &&
      !searchInput.current?.contains(e.target as Element)
    ) {
      showSearchBox(false);
    }
  };

  const handleSearchClick = () => {
    if (searchReq.length) {
      showSearchBox(true);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(findUser(searchReq));
  };

  return (
    <div className='header-search'>
      <form onSubmit={handleSearch} className='header-search-form'>
        <BsSearch />
        <input
          ref={searchInput}
          placeholder='Search...'
          onChange={(e) => {
            setSearchReq(e.target.value);
          }}
          onClick={handleSearchClick}
        />
      </form>
      {searchBox && <HeaderSearchBox />}
    </div>
  );
};
