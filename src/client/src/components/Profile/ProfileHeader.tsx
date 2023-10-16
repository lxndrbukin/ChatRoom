import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ProfileHeaderButtons } from './ProfileHeaderButtons';

export const ProfileHeader: React.FC = (): JSX.Element | null => {
  const { info, friends } = useSelector((state: RootState) => state.profile);

  if (info) {
    const { mainPhoto, fullName } = info;
    const { firstName, lastName } = info.fullName;
    const profileUserData = { userId: info.userId, fullName };
    return (
      <div className='profile-header'>
        <div className='profile-header-bg-img'></div>
        <div className='profile-header-main'>
          <div className='profile-header-details'>
            <img
              className='profile-header-details-avatar'
              src={mainPhoto}
              alt={`${firstName} ${lastName}`}
            />
            <div className='profile-header-data'>
              <span className='profile-header-data-fullname'>
                {firstName} {lastName}
              </span>
              <span className='profile-header-data-friends-num'>
                {friends?.length} Friends
              </span>
            </div>
          </div>
          <div className='profile-header-main-buttons'>
            <ProfileHeaderButtons profileUserData={profileUserData} />
          </div>
        </div>
      </div>
    );
  }
  return null;
};
