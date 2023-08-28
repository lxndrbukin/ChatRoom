import React, { useEffect } from 'react';
import { ChatBoxProps } from './types';
import { Socket } from 'socket.io-client';

export const ChatBox: React.FC<ChatBoxProps> = ({ socket }): JSX.Element => {
  useEffect(() => {
    socket.on('event://get-message', (data) => {
      console.log(data);
    });
  }, [socket]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      message: { value: string };
    };
    socket.emit('event://send-message', target.message.value);
  };

  return (
    <div className='chat-box'>
      <div className='chat-messages'></div>
      <form onSubmit={handleSendMessage}>
        <input name='message' />
        <button>Send</button>
      </form>
    </div>
  );
};
