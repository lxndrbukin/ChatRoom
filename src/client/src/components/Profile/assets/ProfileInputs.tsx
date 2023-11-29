import React from 'react';
import { ProfileEditInputProps, ProfileEditSelectProps } from '../types';

export const ProfileEditInput: React.FC<ProfileEditInputProps> = ({
  label,
  name,
  placeholder,
  defaultValue,
  onChange,
}): JSX.Element => {
  return (
    <div className='profile-edit-input-wrapper'>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
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
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        className='profile-edit-textarea'
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export const ProfileEditSelect: React.FC<ProfileEditSelectProps> = ({
  name,
  defaultValue,
  options,
}): JSX.Element => {
  const renderOptions = (): JSX.Element[] => {
    return options().map((option: string | number) => {
      return <option>{option}</option>;
    });
  };

  return (
    <select
      defaultValue={defaultValue}
      name={name}
      className='profile-edit-select'
    >
      {renderOptions()}
    </select>
  );
};
