import React from 'react';
import { ChatsListProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { ChatsListItem } from './ChatsListItem';

export const ChatsList: React.FC<ChatsListProps> = ({
  socket,
}): JSX.Element => {
  const { chatsList } = useSelector((state: RootState) => state.chats);

  const renderChatList = () => {
    return chatsList.map((chat) => {
      return <ChatsListItem chat={chat} />;
    });
  };

  return (
    <div className='chats-list-wrapper'>
      <Link to='/IM/create'>
        <button>Create a Chat</button>
      </Link>
      <div className='chats-list'>{renderChatList()}</div>
    </div>
  );
};
