import React, { useEffect } from 'react';
import { ProfileFriendsProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getProfileFriends } from '../../store';
import { ProfileFriend } from './ProfileFriend';

export const ProfileFriends: React.FC<
  ProfileFriendsProps
> = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { friends, info } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (info) {
      dispatch(getProfileFriends(info.userId));
    }
  }, [info]);

  const renderFriends = (): JSX.Element[] | JSX.Element => {
    if (friends) {
      return friends.map((friend) => {
        return <ProfileFriend key={friend.userId} {...friend} />;
      });
    }
    return <span className='profile-friends-empty'>No Friends</span>;
  };

  return (
    <div className='profile-friends box'>
      <div className='profile-friends-header box-header'>Friends</div>
      <div className='profile-friends-list'>{renderFriends()}</div>
    </div>
  );
};
