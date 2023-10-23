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
  updateSessionStatus,
  updateProfileStatus,
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
        onlineStatus: userData.status.previousOnlineStatus,
        previousOnlineStatus: userData.status.previousOnlineStatus,
      });
      dispatch(getUserFriends(userData.userId));
      socket.on('event://update-user-status-res', (data) => {
        dispatch(updateSessionStatus(data));
        dispatch(updateProfileStatus(data));
      });
      window.addEventListener('beforeunload', () => {
        socket.emit('event://update-user-status', {
          userId: userData.userId,
          onlineStatus: OnlineStatus.Offline,
          previousOnlineStatus: userData.status.onlineStatus,
        });
      });
      return () => {
        window.removeEventListener('unload', () => {
          socket.emit('event://update-user-status', {
            userId: userData.userId,
            onlineStatus: OnlineStatus.Offline,
            previousOnlineStatus: userData.status.onlineStatus,
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
