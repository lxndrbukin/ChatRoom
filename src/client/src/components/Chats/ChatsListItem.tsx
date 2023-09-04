import React from 'react';
import { ChatsListItemProps } from './types';

export const ChatsListItem: React.FC<ChatsListItemProps> = ({
  chat,
}): JSX.Element => {
  return (
    <div key={chat.chatId} className='chat-item'>
      <div className='chat-item-name'>{chat.name}</div>
    </div>
  );
};
