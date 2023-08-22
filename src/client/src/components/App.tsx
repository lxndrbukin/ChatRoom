import React from 'react';
import * as socketIO from 'socket.io-client';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';

const socket = socketIO.connect('http://localhost:5000');

interface AppProps {
  message: string;
}

export const App: React.FC = (): JSX.Element => {
  return (
    <div className='container'>
      <Sidebar />
      <Outlet />
    </div>
  );
};
