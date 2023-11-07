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
  const { info, friends } = useSelector((state: RootState) => state.profile);

  const handleFriendStatus = (requestAction: FriendRequestAction) => {
    dispatch(
      changeFriendStatus({
        ...profileUserData,
        requestAction,
      })
    );
  };

  const personalBtns = (userId: number) => {
    return (
      <React.Fragment>
        <Link className='ui-button' to={`/profile/${userId}/edit`}>
          Edit Profile
        </Link>
        <Link className='ui-button' to='/settings'>
          Settings
        </Link>
      </React.Fragment>
    );
  };

  const acceptBtn = () => {
    return (
      <button
        onClick={() => handleFriendStatus(FriendRequestAction.Accept)}
        className='ui-button'
      >
        Follows You
      </button>
    );
  };

  const sentBtn = () => {
    return (
      <button
        onClick={() => handleFriendStatus(FriendRequestAction.Cancel)}
        className='ui-button'
      >
        Request Sent
      </button>
    );
  };

  const friendBtns = (userId: number) => {
    return (
      <React.Fragment>
        <button className='ui-icon-button'>
          <BsPersonCheckFill
            onClick={() => handleFriendStatus(FriendRequestAction.Remove)}
            size={22}
          />
        </button>
        <Link className='ui-button' to={`/IM?id=${userId}`}>
          Message
        </Link>
      </React.Fragment>
    );
  };

  const sendBtn = () => {
    return (
      <button className='ui-icon-button'>
        <BsPersonPlusFill
          onClick={() => handleFriendStatus(FriendRequestAction.Send)}
          size={22}
        />
      </button>
    );
  };

  if (userData && isLoggedIn) {
    const { userId } = userData;
    if (profileUserData.userId === userId) {
      return personalBtns(userId);
    } else {
      if (requestsList.length) {
        if (
          requestsList.find(
            (request) => request.userId === profileUserData.userId
          )
        ) {
          return acceptBtn();
        }
      }
      if (sentRequests.length) {
        if (
          sentRequests.find(
            (request) => request.userId === profileUserData.userId
          )
        ) {
          return sentBtn();
        }
      }
      if (friends) {
        if (friends.find((friend) => friend.userId === userId)) {
          return friendBtns(userId);
        }
      }
      return sendBtn();
    }
  }
  return null;
};
