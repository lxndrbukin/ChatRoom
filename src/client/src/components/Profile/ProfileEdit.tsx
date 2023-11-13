import './assets/styles.scss';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, updateProfile } from '../../store';
import { ProfileEditInput, ProfileEditTextarea } from './assets/ProfileInputs';
import { AiFillDelete } from 'react-icons/ai';
import { HiPencil } from 'react-icons/hi';
import { ProfileEditModal } from './assets/ProfileEditModal';

export const ProfileEdit: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.session);
  const [file, setFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState(userData?.fullName.firstName);
  const [lastName, setLastName] = useState(userData?.fullName.lastName);
  const [box, showBox] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

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
    dispatch(updateProfile(data));
  };

  const renderChangeAvatar = (): JSX.Element => {
    return (
      <div
        onMouseOut={() => showBox(false)}
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
    <React.Fragment>
      <div className='profile-edit'>
        <div className='profile-edit-form-wrapper box'>
          <div className='box-header'>Profile</div>
          <div className='profile-edit-main-info'>
            <div
              style={{
                backgroundImage: `url(https://primary.jwwb.nl/public/o/e/c/temp-jqisaigwopnxxlyuaxqc/xnug1j/grunge-sith-logo-artwork-v0nobz86mo1la5z4.jpg)`,
              }}
              className='profile-edit-main-info-bg'
            ></div>
            <div className='profile-edit-main-info-data'>
              <div
                onMouseOver={() => showBox(true)}
                onMouseOut={() => showBox(false)}
                className='profile-edit-main-info-avatar-wrapper'
              >
                <img
                  className='profile-edit-main-info-avatar'
                  src={userData?.mainPhoto}
                  alt={userData?.fullName.firstName}
                />
                {box && renderChangeAvatar()}
              </div>
              <div className='profile-edit-main-info-name'>
                <span>{firstName}</span>
                <span>{lastName}</span>
              </div>
            </div>
          </div>
          <form className='profile-edit-form' onSubmit={handleSubmit}>
            <ProfileEditInput
              label='First Name:'
              name='firstName'
              defaultValue={userData?.fullName.firstName!}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <ProfileEditInput
              label='Last Name:'
              name='lastName'
              defaultValue={userData?.fullName.lastName!}
              onChange={(e) => setLastName(e.target.value)}
            />
            <ProfileEditTextarea
              label='Brief Information:'
              name='brief'
              placeholder='Tell us about yourself'
            />
            <button className='profile-edit-form-submit ui-form-button'>
              Submit
            </button>
          </form>
        </div>
      </div>
      <ProfileEditModal
        styles={customStyles}
        isOpen={modalIsOpen}
        handleSetFile={handleSetFile}
        handleClose={() => handleToggleModal(false)}
      />
    </React.Fragment>
  );
};
