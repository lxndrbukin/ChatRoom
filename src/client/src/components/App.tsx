import './assets/styles.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getSession, getUserFriends, RootState } from '../store';
import { Header } from './Header/Header';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';

export const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, userData } = useSelector(
    (state: RootState) => state.session
  );

  useEffect(() => {
    dispatch(getSession());
    if (isLoggedIn && userData) {
      dispatch(getUserFriends(userData.userId));
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className='container'>
      <Header />
      <div className='body-wrapper'>
        <div className='body'>
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
