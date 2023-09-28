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
      <form onSubmit={signupUser} className='auth-form'>
        <label htmlFor='email'>Email:</label>
        <input placeholder='Email' id='email' name='email' />
        <label htmlFor='first-name'>First Name:</label>
        <input placeholder='First Name' id='first-name' name='firstName' />
        <label htmlFor='last-name'>Last Name:</label>
        <input placeholder='Last Name' id='last-name' name='lastName' />
        <label htmlFor='password'>Password:</label>
        <input placeholder='Password' id='password' name='password' />
        <button className='auth-form-button'>Sign Up</button>
      </form>
      {message && renderErrorMessage()}
    </div>
  );
};
