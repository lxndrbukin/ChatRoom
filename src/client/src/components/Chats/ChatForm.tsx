import React from 'react';
import { ChatFormProps } from './types';

export const ChatForm: React.FC<ChatFormProps> = ({
  handleSendMessage,
  handleTyping,
}): JSX.Element => {
  return (
    <form onSubmit={handleSendMessage}>
      <input onKeyDown={handleTyping} name='message' />
      <button className='chat-button'>Send</button>
    </form>
  );
};
