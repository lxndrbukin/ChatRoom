import React from 'react';

export const LoginAuth: React.FC = (): JSX.Element => {
  return (
    <form className='auth-form'>
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' />
    </form>
  );
};
