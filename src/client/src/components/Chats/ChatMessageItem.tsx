import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ChatMessageProps } from './types';

export const ChatMessageItem: React.FC<ChatMessageProps> = ({
  messageData,
}): JSX.Element => {
  const { userData } = useSelector((state: RootState) => state.session);
  const { firstName, lastName } = messageData.fullName;
  return (
    <div
      className={`message${
        messageData.userId === userData?.userId ? ' current-user' : ''
      }`}
    >
      <div className='message-side-one'>
        <img
          className='message_avatar'
          src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
          alt={messageData.fullName.firstName}
          style={{ height: '50px', borderRadius: '50%' }}
        />
      </div>
      <div className='message-side-two'>
        <span className='message_nickname'>
          {firstName} {lastName}
        </span>
        <div className='message-text'>{messageData.message}</div>
      </div>
    </div>
  );
};
