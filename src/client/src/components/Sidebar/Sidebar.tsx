import './assets/styles.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { SidebarLink } from './types';
import { mainLinks, additionalLinks } from './assets/links';
import { IoMdChatboxes } from 'react-icons/io';

export const Sidebar: React.FC = (): JSX.Element => {
  const { isLoggedIn } = useSelector((state: RootState) => state.session);

  const renderLinks = (links: SidebarLink[]): Array<JSX.Element | null> => {
    return links.map((link: SidebarLink): JSX.Element | null => {
      if (link.ifLoggedIn === isLoggedIn) {
        return (
          <li className='sidebar-link' key={link.name}>
            <Link to={link.path}>{link.icon}</Link>
          </li>
        );
      }
      return null;
    });
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-logo'>
        <Link to='/'>
          <IoMdChatboxes size={50} />
        </Link>
      </div>
      <nav className='sidebar-links'>
        <ul className='sidebar-links-list'>{renderLinks(mainLinks)}</ul>
      </nav>
      <nav className='sidebar-links additional'>
        <ul className='sidebar-links-list'>{renderLinks(additionalLinks)}</ul>
      </nav>
    </div>
  );
};
