import React, { useEffect } from 'react';
import { ChatsListProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, getChat } from '../../store';

export const ChatsList: React.FC<ChatsListProps> = ({
  socket,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { chatsList } = useSelector((state: RootState) => state.chats);

  useEffect(() => {
    socket.on('event://create-chat-res', (data) => {
      dispatch(getChat(data));
    });
  });

  return (
    <div className='chats-list-wrapper'>
      <Link to='/IM/create'>
        <button>Create a Chat</button>
      </Link>
      <div className='chats-list'></div>
    </div>
  );
};
