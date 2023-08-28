import React from 'react';
import { CreateChatProps } from './types';

export const CreateChat: React.FC<CreateChatProps> = ({
  socket,
}): JSX.Element => {
  return (
    <form className='form'>
      <label htmlFor='chat-name'>Chat Name:</label>
      <input placeholder='Chat Name' id='chat-name' />
      <label htmlFor='chat-password'>Password (not required):</label>
      <input placeholder='Password' id='chat-password' />
    </form>
  );
};
