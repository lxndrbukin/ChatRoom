import React, { useEffect, useState } from 'react';
import { ChatsProps } from './types';

export const Chats: React.FC<ChatsProps> = ({ socket }): JSX.Element => {
  useEffect(() => {
    socket.on('messageRes', (data) => {
      console.log(data);
    });
  }, [socket]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      message: { value: string };
    };
    socket.emit('message', target.message.value);
  };

  return (
    <div>
      <form onSubmit={handleSendMessage}>
        <input name='message' />
        <button>Send</button>
      </form>
    </div>
  );
};
