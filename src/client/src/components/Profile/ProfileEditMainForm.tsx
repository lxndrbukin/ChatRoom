import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { ProfileEditMainFormProps } from './types';
import { RootState, AppDispatch, updateProfile } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileEditUserInfo } from './ProfileEditUserInfo';
import { ProfileEditForm } from './ProfileEditForm';
import {
  ProfileEditInput,
  ProfileEditTextarea,
  ProfileEditSelect,
} from './assets/ProfileInputs';
import { days, months, years } from './assets/dob';
import { ProfileEditModal } from './assets/ProfileEditModal';

export const ProfileEditMainForm: React.FC<
  ProfileEditMainFormProps
> = (): JSX.Element => {
  const { userData } = useSelector((state: RootState) => state.session);
  const { info } = useSelector((state: RootState) => state.profile);
  const [firstName, setFirstName] = useState(userData?.fullName.firstName);
  const [lastName, setLastName] = useState(userData?.fullName.lastName);

  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleSetFile = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
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
      <ProfileEditUserInfo
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
      <ProfileEditModal
        isOpen={modalIsOpen}
        handleClose={() => handleToggleModal(false)}
        handleSetFile={handleSetFile}
      />
    </React.Fragment>
  );
};
