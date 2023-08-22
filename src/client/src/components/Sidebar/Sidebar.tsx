import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar: React.FC = (): JSX.Element => {
  return (
    <div className='sidebar'>
      <nav className='sidebar-links'>
        <ul className='sidebar-links-list'>
          <li className='sidebar-link'>
            <Link to={'/chats'}>Chats</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
