import React, { useState } from 'react';
import { ProfileEditMainFormProps } from './types';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { ProfileEditUserInfo } from './ProfileEditUserInfo';
import { ProfileEditForm } from './ProfileEditForm';
import { ProfileEditInput, ProfileEditTextarea } from './assets/ProfileInputs';

export const ProfileEditMainForm: React.FC<ProfileEditMainFormProps> = ({
  handleToggleModal,
  handleSubmit,
}): JSX.Element => {
  const { userData } = useSelector((state: RootState) => state.session);
  const { info } = useSelector((state: RootState) => state.profile);
  const [firstName, setFirstName] = useState(userData?.fullName.firstName);
  const [lastName, setLastName] = useState(userData?.fullName.lastName);

  return (
    <div>
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
    </div>
  );
};
