import React, { FormEvent } from 'react';
import { ProfileEditForm } from './ProfileEditForm';
import { ProfileEditInput, ProfileEditSelect } from './assets/ProfileInputs';
import { days, months, years } from './assets/dob';

export const ProfileEditPersonalForm: React.FC = (): JSX.Element => {
  const handleSubmit = (e: FormEvent) => {
    const data = new FormData();
    const target = e.target as typeof e.target & {
      country: { value: string };
      city: { value: string };
    };
  };

  return (
    <React.Fragment>
      <ProfileEditForm handleSubmit={handleSubmit}>
        <ProfileEditInput name='country' label='Country:' />
        <ProfileEditInput name='city' label='City:' />
        <div className='profile-edit-dob'>
          <label>Date Of Birth:</label>
          <div className='profile-edit-dob-options'>
            <ProfileEditSelect name='dd' options={days} />
            <ProfileEditSelect name='mm' options={months} />
            <ProfileEditSelect name='yyyy' options={years} />
          </div>
        </div>
      </ProfileEditForm>
    </React.Fragment>
  );
};
