import './assets/styles.scss';
import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  getSession,
  getUserFriends,
  RootState,
  OnlineStatus,
} from '../store';
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
        status: userData.status.previousOnlineStatus,
        previousStatus: userData.status.previousOnlineStatus,
      });
      dispatch(getUserFriends(userData.userId));
      window.addEventListener('unload', () => {
        socket.emit('event://update-user-status', {
          userId: userData.userId,
          status: OnlineStatus.Offline,
          previousStatus: userData.status.onlineStatus,
        });
      });
      return () => {
        window.removeEventListener('unload', () => {
          socket.emit('event://update-user-status', {
            userId: userData.userId,
            status: OnlineStatus.Offline,
            previousStatus: userData.status.onlineStatus,
          });
        });
      };
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className='container'>
      <Header socket={socket} />
      <div className='body-wrapper'>
        <div className='body'>
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
