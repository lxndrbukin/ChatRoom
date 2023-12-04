import React from 'react';
import { ChatFormProps } from './types';

export const ChatForm: React.FC<ChatFormProps> = ({
  handleSendMessage,
  handleTyping,
}): JSX.Element => {
  return (
    <form className="message-form" onSubmit={handleSendMessage}>
      <textarea
        className="message-text-input"
        onKeyDown={handleTyping}
        name="message"
      />
      <button className="message-send-button ui-button">Send</button>
    </form>
  );
};
