import React, { FormEvent, useState } from 'react';
import { ProfileEditMainProps } from './types';

export const ProfileEditMain: React.FC<ProfileEditMainProps> = ({
  header,
  children,
}): JSX.Element => {
  return (
    <div className='profile-edit'>
      <div className='profile-edit-form-wrapper box'>
        <div className='profile-edit-form-header box-header'>{header}</div>
        {children}
      </div>
    </div>
  );
};
