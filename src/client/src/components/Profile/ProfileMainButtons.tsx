import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileMainButtonsProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppDispatch,
  FriendRequestAction,
  RootState,
  changeFriendStatus,
} from '../../store';
import {
  BsPersonFillAdd,
  BsPersonFillDash,
  BsPersonFillSlash,
  BsPersonFillX,
} from 'react-icons/bs';

export const ProfileMainButtons: React.FC<ProfileMainButtonsProps> = ({
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
        if (requestsList.filter((request) => request.userId === userId)) {
          return (
            <button className='ui-icon-button'>
              <BsPersonFillX
                onClick={() => handleFriendStatus(FriendRequestAction.Decline)}
                size={22}
              />
            </button>
          );
        }
      }
      if (sentRequests.length) {
        if (sentRequests.filter((request) => request.userId === userId)) {
          return (
            <button className='ui-icon-button'>
              <BsPersonFillSlash
                onClick={() => handleFriendStatus(FriendRequestAction.Cancel)}
                size={22}
              />
            </button>
          );
        }
      }
      if (info && info.friends) {
        if (info.friends.find((friend) => friend.userId === userId)) {
          return (
            <button className='ui-icon-button'>
              <BsPersonFillDash
                onClick={() => handleFriendStatus(FriendRequestAction.Remove)}
                size={22}
              />
            </button>
          );
        }
      }
      return (
        <button className='ui-icon-button'>
          <BsPersonFillAdd
            onClick={() => handleFriendStatus(FriendRequestAction.Send)}
            size={22}
          />
        </button>
      );
    }
  }
  return null;
};
