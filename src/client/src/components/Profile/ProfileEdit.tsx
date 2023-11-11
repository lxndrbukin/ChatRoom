import './assets/styles.scss';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, updateProfile } from '../../store';
import { ProfileEditInput, ProfileEditTextarea } from './assets/ProfileInputs';

export const ProfileEdit: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.session);
  const [file, setFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState(userData?.fullName.firstName);
  const [lastName, setLastName] = useState(userData?.fullName.lastName);

  const handleSetFile = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append('my_file', file as File);
    dispatch(updateProfile(data));
  };

  return (
    <div className='profile-edit'>
      <div className='profile-edit-form-wrapper box'>
        <div className='box-header'>Profile</div>
        <div className='profile-edit-main-info'>
          <div
            style={{
              backgroundImage: `url(https://primary.jwwb.nl/public/o/e/c/temp-jqisaigwopnxxlyuaxqc/xnug1j/grunge-sith-logo-artwork-v0nobz86mo1la5z4.jpg)`,
            }}
            className='profile-edit-main-info-bg'
          ></div>
          <div className='profile-edit-main-info-data'>
            <div className='profile-edit-main-info-avatar-wrapper'>
              <img
                className='profile-edit-main-info-avatar'
                src={userData?.mainPhoto}
                alt={userData?.fullName.firstName}
              />
              <div className='profile-edit-main-info-avatar-change'></div>
            </div>
            <div className='profile-edit-main-info-name'>
              <span>{firstName}</span>
              <span>{lastName}</span>
            </div>
          </div>
        </div>
        <form className='profile-edit-form' onSubmit={handleSubmit}>
          <ProfileEditInput
            label='First Name:'
            name='firstName'
            defaultValue={userData?.fullName.firstName!}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <ProfileEditInput
            label='Last Name:'
            name='lastName'
            defaultValue={userData?.fullName.lastName!}
            onChange={(e) => setLastName(e.target.value)}
          />
          <ProfileEditTextarea
            label='Last Name:'
            name='brief'
            placeholder='Tell us about yourself'
          />
          <input type='file' onChange={handleSetFile} />
          <button className='profile-edit-form-submit ui-form-button'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
