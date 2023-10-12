import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getProfileFriends } from '../../store';

export const ProfileFriends: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { friends, info } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (info) {
      dispatch(getProfileFriends(info.userId));
      console.log(friends);
    }
  }, [info, dispatch]);

  return <div className='profile-friends'></div>;
};
