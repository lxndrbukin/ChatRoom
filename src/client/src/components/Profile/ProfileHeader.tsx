import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ProfileHeaderButtons } from './ProfileHeaderButtons';

export const ProfileHeader: React.FC = (): JSX.Element | null => {
  const { info, friends } = useSelector((state: RootState) => state.profile);

  if (info) {
    const { mainPhoto, fullName, status } = info;
    const { firstName, lastName } = info.fullName;
    const { onlineStatus } = status;
    const profileUserData = { userId: info.userId, fullName };
    return (
      <div className='profile-header box'>
        <div className='profile-header-bg-img'></div>
        <div className='profile-header-main'>
          <div className='profile-header-details'>
            <div className='profile-header-details-avatar'>
              <img
                className='profile-header-details-avatar-img'
                src={mainPhoto}
                alt={`${firstName} ${lastName}`}
              />
              <div
                className={`profile-header-details-avatar-status-${onlineStatus.toLowerCase()}`}
              ></div>
            </div>
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
