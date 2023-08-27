import './assets/styles.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';

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
