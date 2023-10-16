import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProfileHeaderButtonsProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppDispatch,
  FriendRequestAction,
  RootState,
  changeFriendStatus,
} from '../../store';
import { BsPersonPlusFill, BsPersonCheckFill } from 'react-icons/bs';

export const ProfileHeaderButtons: React.FC<ProfileHeaderButtonsProps> = ({
  profileUserData,
}): JSX.Element | null => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );
  const { requestsList, sentRequests } = useSelector(
    (state: RootState) => state.friends
  );
  const { info } = useSelector((state: RootState) => state.profile);

  const handleFriendStatus = (requestAction: FriendRequestAction) => {
    dispatch(
      changeFriendStatus({
        ...profileUserData,
        requestAction,
      })
    );
  };

  if (userData && isLoggedIn) {
    const { userId } = userData;
    if (profileUserData.userId === userId) {
      return (
        <React.Fragment>
          <Link to={`/profile/${userId}/edit`}>
            <button className='ui-button'>Edit Profile</button>
          </Link>
          <Link to='/settings' className='profile-settings'>
            <button className='ui-button'>Settings</button>
          </Link>
        </React.Fragment>
      );
    } else {
      if (requestsList.length) {
        if (
          requestsList.find(
            (request) => request.userId === profileUserData.userId
          )
        ) {
          return (
            <button
              onClick={() => handleFriendStatus(FriendRequestAction.Accept)}
              className='ui-button'
            >
              Follows You
            </button>
          );
        }
      }
      if (sentRequests.length) {
        if (
          sentRequests.find(
            (request) => request.userId === profileUserData.userId
          )
        ) {
          return (
            <button
              onClick={() => handleFriendStatus(FriendRequestAction.Cancel)}
              className='ui-button'
            >
              Request Sent
            </button>
          );
        }
      }
      if (info && info.friends) {
        if (info.friends.find((friend) => friend.userId === userId)) {
          return (
            <button className='ui-icon-button'>
              <BsPersonCheckFill
                onClick={() => handleFriendStatus(FriendRequestAction.Remove)}
                size={22}
              />
            </button>
          );
        }
      }
      return (
        <button className='ui-icon-button'>
          <BsPersonPlusFill
            onClick={() => handleFriendStatus(FriendRequestAction.Send)}
            size={22}
          />
        </button>
      );
    }
  }
  return null;
};
