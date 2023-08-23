import './assets/styles.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarLink } from './types';
import { mainLinks, additionalLinks } from './assets/links';
import { IoMdChatboxes } from 'react-icons/io';

export const Sidebar: React.FC = (): JSX.Element => {
  const renderLinks = (links: SidebarLink[]): JSX.Element[] => {
    return links.map((link: SidebarLink) => {
      return (
        <li className='sidebar-link' key={link.name}>
          <Link to={link.path}>{link.icon}</Link>
        </li>
      );
    });
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-logo'>
        <IoMdChatboxes size={30} />
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
