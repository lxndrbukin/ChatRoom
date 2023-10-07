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
import { BsPersonFillAdd } from 'react-icons/bs';

export const ProfileMainButtons: React.FC<ProfileMainButtonsProps> = ({
  profileUserData,
}): JSX.Element | null => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );

  const handleAddFriend = () => {
    dispatch(
      changeFriendStatus({
        ...profileUserData,
        requestAction: FriendRequestAction.Send,
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
    }
    return (
      <React.Fragment>
        <button className='ui-icon-button'>
          <BsPersonFillAdd onClick={handleAddFriend} size={22} />
        </button>
      </React.Fragment>
    );
  }
  return null;
};
