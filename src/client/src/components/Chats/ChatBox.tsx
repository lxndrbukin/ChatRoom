import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { ChatBoxProps } from './types';
import {
  fetchChat,
  sendMessage,
  Chat,
  ChatMessage,
  SendMessageRes,
  getChat,
  RootState,
  AppDispatch,
} from '../../store';
import { ChatMessages } from './ChatMessages';

export const ChatBox: React.FC<ChatBoxProps> = ({ socket }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { chatId } = useParams();
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );
  const { currentChat } = useSelector((state: RootState) => state.chats);

  useEffect(() => {
    if (chatId) {
      dispatch(getChat(chatId));
    }
    socket.on('event://send-message-res', (data: SendMessageRes): void => {
      if (chatId === data.chatId) {
        dispatch(sendMessage(data));
      }
    });
    return () => {
      socket.off('event://send-message-res');
    };
  }, [socket, dispatch]);

  const renderMessages = (): JSX.Element[] | null => {
    if (currentChat && currentChat.messages) {
      return currentChat.messages.map((messageData, id) => {
        return <div key={id}>{messageData.message}</div>;
      });
    }
    return null;
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      message: { value: string };
    };
    if (currentChat) {
      console.log('send');
      if (chatId === JSON.stringify(currentChat.chatId)) {
        socket.emit('event://send-message', {
          chatId,
          userId: userData?.userId,
          nickname: userData?.nickname,
          message: target.message.value,
        });
      }
    }
  };

  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }
  return (
    <div className='chat-box'>
      <ChatMessages messages={currentChat ? currentChat.messages : []} />
      <form onSubmit={handleSendMessage}>
        <input name='message' />
        <button className='chat-button'>Send</button>
      </form>
    </div>
  );
};
