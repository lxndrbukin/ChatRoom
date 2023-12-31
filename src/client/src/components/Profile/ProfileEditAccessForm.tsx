import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, updateUser } from '../../store';
import { ProfileEditForm } from './ProfileEditForm';
import { ProfileEditInput } from './assets/ProfileInputs';

export const ProfileEditAccessForm: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent): void => {
    const data = new FormData();
    const target = e.target as typeof e.target & {
      email: { value: string };
      currentPassword: { value: string };
      newPassword: { value: string };
      confirmNewPassword: { value: string };
    };
    const { currentPassword, newPassword, confirmNewPassword, email } = target;
    data.append('email', email.value);
    data.append(
      'passwords',
      JSON.stringify({
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        confirmNewPassword: confirmNewPassword.value,
      })
    );
    dispatch(updateUser(data));
  };

  return (
    <ProfileEditForm handleSubmit={handleSubmit}>
      <ProfileEditInput label='Email:' name='email' />
      <ProfileEditInput label='Current Password:' name='currentPassword' />
      <ProfileEditInput label='New Password:' name='newPassword' />
      <ProfileEditInput
        label='Confirm New Password:'
        name='confirmNewPassword'
      />
    </ProfileEditForm>
  );
};
