import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileMainButtonsProps } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BsPersonFillAdd } from 'react-icons/bs';

export const ProfileMainButtons: React.FC<ProfileMainButtonsProps> = ({
  profileUserId,
}): JSX.Element | null => {
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );

  if (userData && isLoggedIn) {
    const { userId } = userData;
    if (profileUserId === userId) {
      return (
        <React.Fragment>
          <Link to={`/profile/${userId}/edit`}>
            <button className='ui-button'>Edit Profile</button>
          </Link>
          <Link to='/settings' className='profile-settings'>
            <button className='ui-button'>Settings</button>
          </Link>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <button className='ui-icon-button'>
          <BsPersonFillAdd size={22} />
        </button>
      </React.Fragment>
    );
  }
  return null;
};
