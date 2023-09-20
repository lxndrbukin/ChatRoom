import React from 'react';
import { ChatMessageProps } from './types';

export const ChatMessageItem: React.FC<ChatMessageProps> = ({
  messageData,
}): JSX.Element => {
  return (
    <div className='message'>
      <span>{messageData.nickname}</span>
      <div className='message-text'>{messageData.message}</div>
    </div>
  );
};
