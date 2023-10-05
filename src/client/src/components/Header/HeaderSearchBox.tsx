import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { HeaderSearchBoxItem } from './HeaderSearchBoxItem';

export const HeaderSearchBox: React.FC = (): JSX.Element => {
  const { users } = useSelector((state: RootState) => state.search);

  const renderResults = (): JSX.Element[] | JSX.Element => {
    if (!users.length) {
      return <div className='header-search-noresult'>No Results</div>;
    }
    return users.map((user) => {
      return (
        <HeaderSearchBoxItem
          key={user.userId}
          userId={user.userId}
          fullName={user.fullName}
          mainPhoto={user.mainPhoto}
        />
      );
    });
  };

  return <div className='header-search-box'>{renderResults()}</div>;
};
