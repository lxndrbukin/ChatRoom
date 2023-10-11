import './assets/styles.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage: React.FC = (): JSX.Element => {
  return (
    <div className='error-page'>
      <div className='error-page-404'>404</div>
      <div className='error-page-text'>
        Oops... The page couldn't be found...
      </div>
      <Link to='/' className='error-page-homepage-btn'>
        BACK HOME
      </Link>
    </div>
  );
};
