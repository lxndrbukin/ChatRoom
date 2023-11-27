import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { ProfileEditForm } from './ProfileEditForm';
import { ProfileEditInput } from './assets/ProfileInputs';

export const ProfileEditAccessForm: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent): void => {};

  return (
    <ProfileEditForm handleSubmit={handleSubmit}>
      <ProfileEditInput label='Current Password:' name='currentPassword' />
      <ProfileEditInput label='New Password:' name='newPassword' />
      <ProfileEditInput
        label='Confirm New Password:'
        name='confirmNewPassword'
      />
    </ProfileEditForm>
  );
};
