import './assets/styles.scss';
import React from 'react';
import { AuthFormProps } from './types';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, signup } from '../../store';

export const SignupAuth: React.FC<AuthFormProps> = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, message } = useSelector(
    (state: RootState) => state.session
  );

  const signupUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      firstName: { value: string };
      lastName: { value: string };
      password: { value: string };
    };
    const { email, firstName, lastName, password } = target;
    const user = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
    };
    dispatch(signup(user));
  };

  const renderErrorMessage = (): JSX.Element => {
    return <div className='auth-error-message'>{message}</div>;
  };

  if (isLoggedIn) {
    return <Navigate replace to='/' />;
  }
  return (
    <div className='auth'>
      <form onSubmit={signupUser} className='auth-form box'>
        <div className='box-header'>Sign Up</div>
        <input className='form-input' placeholder='Email' name='email' />
        <input
          className='form-input'
          placeholder='First Name'
          name='firstName'
        />
        <input className='form-input' placeholder='Last Name' name='lastName' />
        <input className='form-input' placeholder='Password' name='password' />
        <button className='ui-form-button'>Sign Up</button>
      </form>
      {message && renderErrorMessage()}
    </div>
  );
};
