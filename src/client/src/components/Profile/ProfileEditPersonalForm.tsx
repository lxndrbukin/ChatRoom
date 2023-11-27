import React, { FormEvent } from 'react';
import { ProfileEditForm } from './ProfileEditForm';
import { ProfileEditInput } from './assets/ProfileInputs';

export const ProfileEditPersonalForm: React.FC = (): JSX.Element => {
  const handleSubmit = (e: FormEvent): void => {
    const data = new FormData();
    const target = e.target as typeof e.target & {
      country: { value: string };
      city: { value: string };
    };
    data.append('about.personal.country', target.country.value);
    data.append('about.personal.city', target.city.value);
  };

  return (
    <React.Fragment>
      <ProfileEditForm handleSubmit={handleSubmit}>
        <ProfileEditInput name='country' label='Country:' />
        <ProfileEditInput name='city' label='City:' />
      </ProfileEditForm>
    </React.Fragment>
  );
};
