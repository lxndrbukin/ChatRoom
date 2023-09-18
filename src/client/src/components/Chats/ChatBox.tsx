import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChatBoxProps } from './types';
import {
  fetchChat,
  sendMessage,
  Chat,
  ChatMessage,
  RootState,
} from '../../store';

export const ChatBox: React.FC<ChatBoxProps> = ({ socket }): JSX.Element => {
  const dispatch = useDispatch();
  const { chatIdParam } = useParams();

  useEffect(() => {
    socket.emit('event://fetch-chat', chatIdParam);
    socket.on('event://fetch-chat-res', (data: Chat): void => {
      dispatch(fetchChat(data));
    });
    socket.on('event://send-message-res', (data: ChatMessage): void => {
      dispatch(sendMessage(data));
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
        <button className='chat-button'>Send</button>
      </form>
    </div>
  );
};
