import React, { useState, useContext, FormEvent } from 'react';
import { ProfileEditMainFormProps } from './types';
import { RootState, AppDispatch, updateProfile } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileEditUserInfo } from './ProfileEditUserInfo';
import { ProfileEditForm } from './ProfileEditForm';
import { ProfileEditInput, ProfileEditTextarea } from './assets/ProfileInputs';

export const ProfileEditMainForm: React.FC<
  ProfileEditMainFormProps
> = (): JSX.Element => {
  const { userData } = useSelector((state: RootState) => state.session);
  const { info } = useSelector((state: RootState) => state.profile);
  const [firstName, setFirstName] = useState(userData?.fullName.firstName);
  const [lastName, setLastName] = useState(userData?.fullName.lastName);

  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      brief: { value: string };
    };
    data.append(
      'fullName',
      JSON.stringify({
        firstName: target.firstName.value,
        lastName: target.lastName.value,
      })
    );
    if (file) {
      data.append('photo', file as File);
    }
    data.append('about.info.brief', target.brief.value);
    dispatch(updateProfile(data));
  };

  return (
    <div>
      <ProfileEditUserInfo
        firstName={firstName!}
        lastName={lastName!}
        handleToggleModal={handlers.handleToggleModal}
      />
      <ProfileEditForm handleSubmit={handleSubmit}>
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
          label='Brief Information:'
          name='brief'
          placeholder='Tell us about yourself'
          defaultValue={info?.about.info.brief!}
        />
      </ProfileEditForm>
    </div>
  );
};
