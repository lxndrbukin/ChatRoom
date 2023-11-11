import './assets/styles.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { SidebarLink } from './types';
import { mainLinks, additionalLinks } from './assets/links';

export const Sidebar: React.FC = (): JSX.Element => {
  const { isLoggedIn, userData } = useSelector(
    (state: RootState) => state.session
  );

  const renderLinks = (links: SidebarLink[]): Array<JSX.Element | null> => {
    return links.map((link: SidebarLink): JSX.Element | null => {
      if (link.ifLoggedIn === isLoggedIn) {
        const path =
          link.path === '/profile' && userData
            ? `${link.path}/${userData.userId}`
            : link.path;
        return (
          <li title={link.name} className='sidebar-link' key={link.name}>
            <Link to={path}>
              {link.icon} <span className='sidebar-link-name'>{link.name}</span>
            </Link>
          </li>
        );
      }
      return null;
    });
  };

  return (
    <div className='sidebar'>
      <nav className='sidebar-links'>
        <ul className='sidebar-links-list'>{renderLinks(mainLinks)}</ul>
      </nav>
      <hr className='separator' />
      <nav className='sidebar-links additional'>
        <ul className='sidebar-links-list'>{renderLinks(additionalLinks)}</ul>
      </nav>
    </div>
  );
};
