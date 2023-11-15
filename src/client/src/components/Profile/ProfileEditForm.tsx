import React from 'react';
import { ProfileEditFormProps } from './types';

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  handleSubmit,
  children,
}): JSX.Element => {
  return (
    <form className='profile-edit-form' onSubmit={handleSubmit}>
      {children}
      <button className='profile-edit-form-submit ui-form-button'>
        Submit
      </button>
    </form>
  );
};
