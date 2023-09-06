import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChatBoxProps } from './types';
import { fetchChat } from '../../store';

export const ChatBox: React.FC<ChatBoxProps> = ({ socket }): JSX.Element => {
  const dispatch = useDispatch();
  const { chatId } = useParams();

  useEffect(() => {
    socket.emit('event://fetch-chat', chatId);
    socket.on('event://fetch-chat-res', (data) => {
      dispatch(fetchChat(data));
    });
    socket.on('event://send-message-res', (data) => {
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
