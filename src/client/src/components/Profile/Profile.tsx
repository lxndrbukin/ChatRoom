import './assets/styles.scss';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getProfile } from '../../store';
import { ProfileMainButtons } from './ProfileMainButtons';

export const Profile: React.FC = (): JSX.Element | null => {
  const dispatch = useDispatch<AppDispatch>();
  const { info } = useSelector((state: RootState) => state.profile);
  const { userId } = useParams();

  const defaultAvatar =
    'https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg';

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
    }
  }, [dispatch, userId]);

  if (info) {
    const { mainPhoto } = info;
    const { firstName, lastName } = info.fullName;
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
                  0 Friends
                </span>
              </div>
            </div>
            <div className='profile-header-main-buttons'>
              <ProfileMainButtons profileUserId={info.userId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
