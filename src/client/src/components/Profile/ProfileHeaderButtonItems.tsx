import React from 'react';
import { Link } from 'react-router-dom';
import { FriendRequestAction } from '../../store';
import { ButtonItemsProps, RequestButtonItemsProps } from './types';
import { BsPersonPlusFill, BsPersonCheckFill } from 'react-icons/bs';
import { BiSolidChevronDown } from 'react-icons/bi';

export const PersonalButtons: React.FC<ButtonItemsProps> = ({
  userId,
}): JSX.Element => {
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

export const AcceptButton: React.FC<RequestButtonItemsProps> = ({
  handleFriendStatus,
}): JSX.Element => {
  return (
    <button
      onClick={() => handleFriendStatus(FriendRequestAction.Accept)}
      className='ui-button'
    >
      Follows You <BiSolidChevronDown />
    </button>
  );
};

export const SentButton: React.FC<RequestButtonItemsProps> = ({
  handleFriendStatus,
}): JSX.Element => {
  return (
    <button
      onClick={() => handleFriendStatus(FriendRequestAction.Cancel)}
      className='ui-button'
    >
      Request Sent <BiSolidChevronDown />
    </button>
  );
};

export const FriendButtons: React.FC<RequestButtonItemsProps> = ({
  userId,
  handleFriendStatus,
}): JSX.Element => {
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

export const SendButton: React.FC<RequestButtonItemsProps> = ({
  handleFriendStatus,
}): JSX.Element => {
  return (
    <button className='ui-icon-button'>
      <BsPersonPlusFill
        onClick={() => handleFriendStatus(FriendRequestAction.Send)}
        size={22}
      />
    </button>
  );
};
