import React, { useEffect, useState } from 'react';
import { ChatsProps } from './types';

export const Chats: React.FC<ChatsProps> = ({ socket }): JSX.Element => {
  useEffect(() => {
    socket.on('event://get-message', (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className='chats'>
      <div className='chats-list'></div>
    </div>
  );
};
