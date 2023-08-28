import React, { useEffect, useState } from 'react';
import { ChatsProps } from './types';
import { Link } from 'react-router-dom';

export const Chats: React.FC<ChatsProps> = ({ socket }): JSX.Element => {
  useEffect(() => {
    socket.on('event://get-message', (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className='chats'>
      <Link to='/IM/create-chat'>Create a Chat</Link>
      <div className='chats-list'></div>
    </div>
  );
};
