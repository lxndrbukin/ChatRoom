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
    const { city, country } = target;
    data.append(
      'about',
      JSON.stringify({ personal: { country: country.value, city: city.value } })
    );
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
