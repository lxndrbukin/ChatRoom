import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFriend } from '../../store';
import { ProfileFriendProps } from './types';
import { AppDispatch } from '../../store';

export const ProfileFriend: React.FC<ProfileFriendProps> = ({
  socket,
  userId,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    socket.emit('event://get-user', userId);
    socket.on('event://get-user-res', (data) => {
      dispatch(getFriend(data));
    });
  }, [dispatch]);

  return (
    <div className='profile-friend'>
      <img className='profile-friend-avatar' src={''} alt={''} />
      <div className='profile-friend-fullname'>
        <span>{''}</span>
        <span>{''}</span>
      </div>
    </div>
  );
};
