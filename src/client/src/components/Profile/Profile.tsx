import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getProfile } from '../../store';

export const Profile: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.session);
  const { info } = useSelector((state: RootState) => state.profile);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
    }
  }, [info, dispatch]);

  return (
    <div className='profile'>
      <div className='profile-header'>
        <div className='profile-header-bg-img'></div>
        <div className='profile-header-main'>
          <div className='profile-header-data'>
            <img className='profile-header-data-avatar' src='' alt='' />
            <span className='profile-header-data-fullname'></span>
          </div>
          <div className='profile-header-main-links'>
            <Link to={`/settings`} className='profile-settings'>
              Settings
            </Link>
            <Link to={`/profile/${userId}/edit`}>Edit Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
