import React, { useEffect } from 'react';
import { CreateChatProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, createChat } from '../../store';
import { Navigate } from 'react-router-dom';

export const CreateChat: React.FC<CreateChatProps> = ({
  socket,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    socket.on('event://create-chat-res', (data) => {
      dispatch(createChat(data));
    });
  }, [socket]);

  const handleCreateNewChat = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      chatName: { value: string };
      password?: { value: string };
    };
    const { chatName, password } = target;
    const chat = {
      chatName: chatName.value,
      password: password ? password.value : undefined,
      createdBy: userData,
    };
    socket.emit('event://create-chat', { ...chat });
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
