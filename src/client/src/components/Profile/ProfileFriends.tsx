import React, { useEffect } from 'react';
import { ProfileFriendsProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getFriend } from '../../store';
import { ProfileFriend } from './ProfileFriend';

export const ProfileFriends: React.FC<ProfileFriendsProps> = ({
  socket,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { friends, info } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (info) {
      socket.emit('event://fetch-friends', info.userId);
      socket.on('event://fetch-friend-res', (data) => {
        dispatch(getFriend(data));
      });
    }
  }, [info, dispatch]);

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
