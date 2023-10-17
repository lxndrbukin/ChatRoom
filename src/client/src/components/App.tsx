import './assets/styles.scss';
import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getSession, getUserFriends, RootState } from '../store';
import { Header } from './Header/Header';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';

interface AppProps {
  socket: Socket;
}

export const App: React.FC<AppProps> = ({ socket }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, userData } = useSelector(
    (state: RootState) => state.session
  );

  useEffect(() => {
    dispatch(getSession());
    if (isLoggedIn && userData) {
      socket.emit('event://update-user-status', {
        userId: userData.userId,
        status: 'Online',
      });
      dispatch(getUserFriends(userData.userId));
      window.addEventListener('unload', () => {
        socket.emit('event://update-user-status', {
          userId: userData.userId,
          status: 'Offline',
        });
      });
      return () => {
        window.removeEventListener('unload', () => {
          socket.emit('event://update-user-status', {
            userId: userData.userId,
            status: 'Offline',
          });
        });
      };
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
