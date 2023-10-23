import './assets/styles.scss';
import React from 'react';
import { AuthFormProps } from './types';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, AppDispatch, RootState } from '../../store';

export const LoginAuth: React.FC<AuthFormProps> = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.session);

  const loginUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const { email, password } = target;
    const user = {
      email: email.value,
      password: password.value,
    };
    dispatch(login(user));
  };

  if (isLoggedIn) {
    return <Navigate replace to='/' />;
  }
  return (
    <div className='auth'>
      <form onSubmit={loginUser} className='auth-form box'>
        <label htmlFor='email'>Email:</label>
        <input id='email' type='email' name='email' />
        <label htmlFor='password'>Password:</label>
        <input id='password' type='password' name='password' />
        <button>Log In</button>
        <span>
          Or sign up <Link to='/signup'>here</Link>
        </span>
      </form>
    </div>
  );
};
