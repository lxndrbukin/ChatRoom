import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getProfileFriends } from '../../store';
import { ProfileFriend } from './ProfileFriend';

export const ProfileFriends: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { friends, info } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (info) {
      dispatch(getProfileFriends(info.userId));
    }
  }, [info, dispatch]);

  const renderFriends = (): JSX.Element[] | JSX.Element => {
    if (friends) {
      return friends.map((friend) => {
        const { mainPhoto, fullName } = friend;
        return <ProfileFriend fullName={fullName} mainPhoto={mainPhoto} />;
      });
    }
    return <span className='profile-friends-empty'>No Friends</span>;
  };

  return <div className='profile-friends'>{renderFriends()}</div>;
};
