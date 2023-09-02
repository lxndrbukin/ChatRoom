import './assets/styles.scss';
import React, { useEffect } from 'react';
import { AuthFormProps } from './types';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, AppDispatch, RootState } from '../../store';

export const LoginAuth: React.FC<AuthFormProps> = ({ socket }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );

  if (isLoggedIn) {
    return <Navigate replace to='/' />;
  }
  return (
    <form className='auth-form'>
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' />
    </form>
  );
};
