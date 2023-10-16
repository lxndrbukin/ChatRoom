import React, { useEffect } from 'react';
import { HeaderNotificationsProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, getFriendReqNotifications } from '../../store';
import { FaBell } from 'react-icons/fa';
import { BsPersonPlusFill } from 'react-icons/bs';

export const HeaderNotifications: React.FC<HeaderNotificationsProps> = ({
  handleInsideClick,
  notificationsBoxRef,
  showNotifications,
}): JSX.Element | null => {
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
    }
  }, [dispatch]);

  const renderFriendReqs = (): JSX.Element[] | JSX.Element => {
    if (!friendRequests.length) {
      return <div className='header-notifications-empty'>No notifications</div>;
    }
    return friendRequests.map((request) => {
      const { firstName, lastName } = request.fullName;
      const { mainPhoto } = request;
      return (
        <div onClick={handleInsideClick} className='header-notification'>
          <img
            className='header-notification-avatar'
            src={mainPhoto}
            alt={firstName}
          />
          <div className='header-notification-text'>
            <span className='header-notification-user-name'>
              {firstName} {lastName}
            </span>
            <span className='header-notification-request-text'>
              sent you a Friend Request
            </span>
          </div>
          <div className='header-notification-btns'>
            <BsPersonPlusFill size={22} />
          </div>
        </div>
      );
    });
  };

  if (showNotifications) {
    return (
      <div ref={notificationsBoxRef} className='header-notifications'>
        {renderFriendReqs()}
      </div>
    );
  }
  return null;
};
