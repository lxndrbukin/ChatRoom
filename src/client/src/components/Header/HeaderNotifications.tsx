import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getFriendReqNotifications } from '../../store';
import { FaBell } from 'react-icons/fa';

export const HeaderNotifications: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { friendRequests } = useSelector(
    (state: RootState) => state.notifications
  );
  const { isLoggedIn, userData } = useSelector(
    (state: RootState) => state.session
  );

  useEffect(() => {
    if (isLoggedIn && userData) {
      dispatch(getFriendReqNotifications(userData.userId));
      console.log(friendRequests);
    }
  }, []);

  const renderFriendReqs = () => {
    return friendRequests.map((request) => {
      const { firstName, lastName } = request.fullName;
      return (
        <div className='header-notification'>
          {firstName} {lastName}
        </div>
      );
    });
  };

  return (
    <div className='header-notifications-wrapper'>
      <div className='header-notifications-icon'>
        <FaBell size={25} />
      </div>
      <div className='header-notifications'>{renderFriendReqs()}</div>
    </div>
  );
};
