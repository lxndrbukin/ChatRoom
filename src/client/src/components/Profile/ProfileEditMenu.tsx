import './assets/styles.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { editMenuLinks } from './assets/editMenuLinks';
import { RootState } from '../../store';

export const ProfileEditMenu: React.FC = (): JSX.Element => {
  const { userData } = useSelector((state: RootState) => state.session);

  const renderLinks = (): JSX.Element[] => {
    return editMenuLinks.map((link) => {
      return (
        <li key={link.name} className='profile-edit-menu-link'>
          <Link to={`/profile/${userData?.userId}/edit${link.path}`}>
            {link.name}
          </Link>
        </li>
      );
    });
  };

  return (
    <nav className='profile-edit-menu box'>
      <ul className='profile-edit-menu-list'>{renderLinks()}</ul>
    </nav>
  );
};
