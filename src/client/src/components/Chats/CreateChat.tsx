import React, { useEffect } from 'react';
import { CreateChatProps } from './types';
import { useDispatch } from 'react-redux';

export const CreateChat: React.FC<CreateChatProps> = ({
  socket,
}): JSX.Element => {
  const handleCreateNewChat = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      chatName: { value: string };
      password?: { value: string };
    };
    const chat = { chatName: target.chatName, password: target.password };
    socket.emit('event://create-chat', chat);
  };

  return (
    <form onSubmit={handleCreateNewChat} className='form'>
      <label htmlFor='chat-name'>Chat Name:</label>
      <input placeholder='Chat Name' id='chat-name' name='chatName' />
      <label htmlFor='chat-password'>Password (optional):</label>
      <input placeholder='Password' id='chat-password' name='password' />
      <button>Create</button>
    </form>
  );
};
