import React from 'react';
import { ProfileEditInputProps } from '../types';

export const ProfileEditInput: React.FC<ProfileEditInputProps> = ({
  label,
  name,
  placeholder,
  defaultValue,
  onChange,
}): JSX.Element => {
  return (
    <div className='profile-edit-input-wrapper'>
      <label>{label}</label>
      <input
        type='text'
        className='profile-edit-input'
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export const ProfileEditTextarea: React.FC<ProfileEditInputProps> = ({
  label,
  name,
  placeholder,
  defaultValue,
}): JSX.Element => {
  return (
    <div className='profile-edit-input-wrapper'>
      <label>{label}</label>
      <textarea
        className='profile-edit-textarea'
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};
