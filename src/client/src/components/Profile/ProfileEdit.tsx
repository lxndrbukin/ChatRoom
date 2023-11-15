import './assets/styles.scss';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ProfileEditProps } from './types';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, updateProfile } from '../../store';
import { ProfileEditMain } from './ProfileEditMain';
import { ProfileEditModal } from './assets/ProfileEditModal';

export const ProfileEdit: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      brief: { value: string };
    };
    data.append(
      'fullName',
      JSON.stringify({
        firstName: target.firstName.value,
        lastName: target.lastName.value,
      })
    );
    if (file) {
      data.append('photo', file as File);
    }
    data.append('about.info.brief', target.brief.value);
    dispatch(updateProfile(data));
  };

  return (
    <React.Fragment>
      <Outlet />
      <ProfileEditModal
        styles={customStyles}
        isOpen={modalIsOpen}
        handleSetFile={handleSetFile}
        handleClose={() => handleToggleModal(false)}
      />
    </React.Fragment>
  );
};
