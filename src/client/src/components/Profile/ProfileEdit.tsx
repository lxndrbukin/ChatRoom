import './assets/styles.scss';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ProfileEditProps } from './types';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, updateProfile } from '../../store';
import { ProfileEditMain } from './ProfileEditMain';
import { ProfileEditModal } from './assets/ProfileEditModal';

export const ProfileEdit: React.FC = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);

  const handleSetFile = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.72)',
    },
  };

  const handleToggleModal = (bool: boolean): void => {
    setIsOpen(bool);
  };

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};
