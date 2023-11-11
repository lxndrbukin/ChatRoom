import './assets/styles.scss';
import React from 'react';
import { AuthFormProps } from './types';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, AppDispatch, RootState } from '../../store';
import { PiArrowsDownUpBold } from 'react-icons/pi';

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
        <div className='box-header'>Login</div>
        <input
          className='form-input'
          type='email'
          name='email'
          placeholder='Email'
        />
        <input
          className='form-input'
          type='password'
          name='password'
          placeholder='Password'
        />
        <button className='ui-form-button'>Log In</button>
        <div className='or-separator'>
          <div className='or-separator-icon'>
            <PiArrowsDownUpBold size={19} />
          </div>
          <hr className='separator' />
        </div>
        <Link to='/signup' className='ui-form-button'>
          Sign Up
        </Link>
      </form>
    </div>
  );
};
