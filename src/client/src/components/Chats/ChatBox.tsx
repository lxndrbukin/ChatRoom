import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { ChatBoxProps } from './types';
import {
  sendMessage,
  SendMessageRes,
  getChat,
  RootState,
  AppDispatch,
} from '../../store';
import { ChatMessages } from './ChatMessages';
import { ChatForm } from './ChatForm';

export const ChatBox: React.FC<ChatBoxProps> = ({ socket }): JSX.Element => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { chatId } = useParams();
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.session
  );
  const { firstName, lastName } = userData?.fullName!;
  const { currentChat } = useSelector((state: RootState) => state.chats);
  const [typingStatus, setTypingStatus] = useState('');

  useEffect(() => {
    if (chatId) {
      dispatch(getChat(chatId));
    }
    socket.on('event://send-message-res', (data: SendMessageRes): void => {
      if (chatId === data.chatId) {
        dispatch(sendMessage(data));
      }
    });
    socket.on('event://typing-message-res', (data: string) => {
      setTypingStatus(data);
    });
    return () => {
      socket.off('event://send-message-res');
    };
  }, [socket, chatId, dispatch]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleTyping = (): void => {
    socket.emit(
      'event://typing-message',
      `${firstName} ${lastName[0]}. is typing...`
    );
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
      <ChatMessages
        typingStatus={typingStatus}
        lastMessageRef={lastMessageRef}
        messages={currentChat ? currentChat.messages : []}
      />
      <div>{typingStatus}</div>
      <ChatForm
        handleTyping={handleTyping}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};
