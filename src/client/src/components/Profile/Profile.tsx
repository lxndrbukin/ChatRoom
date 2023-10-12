import './assets/styles.scss';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppDispatch,
  RootState,
  getProfile,
  getProfileFriends,
} from '../../store';
import { ProfileMainButtons } from './ProfileMainButtons';
import { ProfileFriends } from './ProfileFriends';

export const Profile: React.FC = (): JSX.Element | null => {
  const dispatch = useDispatch<AppDispatch>();
  const { info, friends } = useSelector((state: RootState) => state.profile);
  const { userId } = useParams();

  const defaultAvatar =
    'https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg';

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
      dispatch(getProfileFriends(JSON.parse(userId)));
    }
  }, [dispatch, userId]);

  if (info) {
    const { mainPhoto, fullName } = info;
    const { firstName, lastName } = info.fullName;
    const profileUserData = { userId: info.userId, fullName };
    return (
      <div className='profile'>
        <div className='profile-header'>
          <div className='profile-header-bg-img'></div>
          <div className='profile-header-main'>
            <div className='profile-header-details'>
              <img
                className='profile-header-details-avatar'
                src={mainPhoto ? mainPhoto : defaultAvatar}
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
              <ProfileMainButtons profileUserData={profileUserData} />
            </div>
          </div>
        </div>
        <ProfileFriends />
      </div>
    );
  }
  return null;
};
