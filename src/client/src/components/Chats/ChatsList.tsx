import React, { useEffect } from 'react';
import { ChatsListProps } from './types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getChat } from '../../store';

export const ChatsList: React.FC<ChatsListProps> = ({
  socket,
}): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('event://get-chat', (data) => {
      dispatch(getChat(data));
    });
  });

  return (
    <div className='chats-list'>
      <Link to='/IM/create-chat'>
        <button>Create a Chat</button>
      </Link>
    </div>
  );
};
