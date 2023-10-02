import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getProfile } from '../../store';

export const Profile: React.FC = (): JSX.Element | null => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.session);
  const { info } = useSelector((state: RootState) => state.profile);
  const { userId } = useParams();

  const defaultAvatar =
    'https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg';

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
    }
  }, [info, dispatch]);

  if (info) {
    const { mainPhoto } = info;
    const { firstName, lastName } = info.userData.fullName;
    return (
      <div className='profile'>
        <div className='profile-header'>
          <div className='profile-header-bg-img'></div>
          <div className='profile-header-main'>
            <div className='profile-header-data'>
              <img
                className='profile-header-data-avatar'
                src={mainPhoto ? mainPhoto : defaultAvatar}
                alt={`${firstName} ${lastName}`}
              />
              <span className='profile-header-data-fullname'>
                {firstName} {lastName}
              </span>
            </div>
            <div className='profile-header-main-links'></div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
