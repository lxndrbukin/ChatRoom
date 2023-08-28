import './assets/styles.scss';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, loginUser } from '../../store';
import { AuthFormProps } from './types';

export const SignupAuth: React.FC<AuthFormProps> = ({
  socket,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );

  useEffect(() => {
    socket.on('event://login-user', (data) => {
      console.log(data);
      dispatch(loginUser(data));
    });
  }, [socket, userData]);

  const signupUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      nickname: { value: string };
      password: { value: string };
    };
    const { email, nickname, password } = target;
    const user = {
      email: email.value,
      nickname: nickname.value,
      password: password.value,
    };
    socket.emit('event://signup-user', user);
  };

  if (isLoggedIn) {
    return <Navigate replace to='/' />;
  }
  return (
    <form onSubmit={signupUser} className='auth-form'>
      <label htmlFor='email'>Email:</label>
      <input placeholder='Email' id='email' name='email' />
      <label htmlFor='nickname'>Nickname:</label>
      <input placeholder='Nickname' id='nickname' name='nickname' />
      <label htmlFor='password'>Password:</label>
      <input placeholder='Password' id='password' name='password' />
      <button className='auth-form-button'>Sign Up</button>
    </form>
  );
};
