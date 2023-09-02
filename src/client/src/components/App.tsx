import './assets/styles.scss';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, getSession } from '../store';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';

export const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  return (
    <div className='container'>
      <Sidebar />
      <Outlet />
    </div>
  );
};
