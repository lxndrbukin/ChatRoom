import './assets/styles.scss';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, updateProfile } from '../../store';
import { ProfileEditInput, ProfileEditTextarea } from './assets/ProfileInputs';
import { ProfileEditModal } from './assets/ProfileEditModal';
import { ProfileEditMain } from './ProfileEditMain';
import { ProfileEditForm } from './ProfileEditForm';

export const ProfileEdit: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.session);
  const { info } = useSelector((state: RootState) => state.profile);
  const [file, setFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState(userData?.fullName.firstName);
  const [lastName, setLastName] = useState(userData?.fullName.lastName);
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
      <div className='profile-edit'>
        <div className='profile-edit-form-wrapper box'>
          <div className='profile-edit-form-header box-header'>Profile</div>
          <ProfileEditMain
            firstName={firstName!}
            lastName={lastName!}
            handleToggleModal={handleToggleModal}
          />
          <ProfileEditForm handleSubmit={handleSubmit}>
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
              defaultValue={info?.about.info.brief!}
            />
          </ProfileEditForm>
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
