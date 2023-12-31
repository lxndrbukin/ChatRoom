import React from 'react';
import { Link } from 'react-router-dom';
import { ChatsListItemProps } from './types';

export const ChatsListItem: React.FC<ChatsListItemProps> = ({
  chat,
}): JSX.Element => {
  return (
    <Link
      key={chat.chatId}
      to={`/IM?chat=${chat.chatId}`}
      className='chat-item'
    >
      <div className='chat-item-name'>{chat.chatId}</div>
    </Link>
  );
};
