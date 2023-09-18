import React from 'react';
import { Link } from 'react-router-dom';
import { ChatsListItemProps } from './types';

export const ChatsListItem: React.FC<ChatsListItemProps> = ({
  chat,
}): JSX.Element => {
  return (
    <Link key={chat.chatId} to={chat.chatId}>
      <div className='chat-item'>
        <div className='chat-item-name'>{chat.chatName}</div>
      </div>
    </Link>
  );
};
