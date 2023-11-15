import React, { useState } from 'react';
import { ProfileEditMainProps } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AiFillDelete } from 'react-icons/ai';
import { HiPencil } from 'react-icons/hi';

export const ProfileEditMain: React.FC<ProfileEditMainProps> = ({
  firstName,
  lastName,
  handleToggleModal,
}): JSX.Element => {
  const { userData } = useSelector((state: RootState) => state.session);

  const [showBox, setShowBox] = useState(false);

  const renderChangeAvatar = (): JSX.Element => {
    return (
      <div
        onMouseOut={() => setShowBox(false)}
        className='profile-edit-main-info-avatar-change'
      >
        <button onClick={() => handleToggleModal(true)}>
          <HiPencil size={20} /> Update Photo
        </button>
        <button>
          <AiFillDelete size={20} /> Delete
        </button>
      </div>
    );
  };

  return (
    <div className='profile-edit-main-info'>
      <div
        style={{
          backgroundImage: `url(https://primary.jwwb.nl/public/o/e/c/temp-jqisaigwopnxxlyuaxqc/xnug1j/grunge-sith-logo-artwork-v0nobz86mo1la5z4.jpg)`,
        }}
        className='profile-edit-main-info-bg'
      ></div>
      <div className='profile-edit-main-info-data'>
        <div
          onMouseOver={() => setShowBox(true)}
          onMouseOut={() => setShowBox(false)}
          className='profile-edit-main-info-avatar-wrapper'
        >
          <img
            className='profile-edit-main-info-avatar'
            src={userData?.mainPhoto}
            alt={userData?.fullName.firstName}
          />
          {showBox && renderChangeAvatar()}
        </div>
        <div className='profile-edit-main-info-name'>
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
      </div>
    </div>
  );
};
