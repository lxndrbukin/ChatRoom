import React, { useRef } from 'react';
import { ProfileHeaderButtonsProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppDispatch,
  FriendRequestAction,
  RootState,
  changeFriendStatus,
} from '../../store';
import {
  PersonalButtons,
  AcceptButton,
  SentButton,
  FriendButtons,
  SendButton,
} from './ProfileHeaderButtonItems';

export const ProfileHeaderButtons: React.FC<ProfileHeaderButtonsProps> = ({
  profileUserData,
}): JSX.Element | null => {
  const actionRef = useRef<HTMLButtonElement>(null);
  const actionBox = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );
  const { requestsList, sentRequests } = useSelector(
    (state: RootState) => state.friends
  );
  const { friends } = useSelector((state: RootState) => state.profile);

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
      return <PersonalButtons userId={userId} />;
    } else {
      if (requestsList.length) {
        if (
          requestsList.find(
            (request) => request.userId === profileUserData.userId
          )
        ) {
          return <AcceptButton handleFriendStatus={handleFriendStatus} />;
        }
      }
      if (sentRequests.length) {
        if (
          sentRequests.find(
            (request) => request.userId === profileUserData.userId
          )
        ) {
          return <SentButton handleFriendStatus={handleFriendStatus} />;
        }
      }
      if (friends) {
        if (friends.find((friend) => friend.userId === userId)) {
          return (
            <FriendButtons
              userId={userId}
              handleFriendStatus={handleFriendStatus}
            />
          );
        }
      }
      return <SendButton handleFriendStatus={handleFriendStatus} />;
    }
  }
  return null;
};
