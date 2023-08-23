import React from 'react';

export const Auth: React.FC = (): JSX.Element => {
  return (
    <div className='auth'>
      <form>
        <input name='email' />
        <input name='nickname' />
        <input name='password' />
      </form>
    </div>
  );
};
