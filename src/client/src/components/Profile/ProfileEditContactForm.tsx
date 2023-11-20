import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, updateProfile } from '../../store';
import { ProfileEditForm } from './ProfileEditForm';
import { ProfileEditInput } from './assets/ProfileInputs';

export const ProfileEditContactForm: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    const target = e.target as typeof e.target & {
      phone: { value: string };
      telegram: { value: string };
      email: { value: string };
    };
    data.append('telegram', target.telegram.value);
    data.append('phone', target.phone.value);
    data.append('email', target.email.value);
    dispatch(updateProfile(data));
  };

  return (
    <React.Fragment>
      <ProfileEditForm handleSubmit={handleSubmit}>
        <ProfileEditInput label='Email:' name='email' placeholder='Email' />
        <ProfileEditInput
          label='Phone:'
          name='phone'
          placeholder='Phone Number'
        />
        <ProfileEditInput
          label='Telegram:'
          name='telegram'
          placeholder='Telegram Nickname'
        />
      </ProfileEditForm>
    </React.Fragment>
  );
};
