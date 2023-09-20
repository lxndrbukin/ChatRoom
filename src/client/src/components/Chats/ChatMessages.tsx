import React from 'react';
import { ChatMessage } from '../../store';
import { ChatMessagesProps } from './types';
import { ChatMessageItem } from './ChatMessageItem';

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
}): JSX.Element => {
  const renderMessages = () => {
    return messages.map((messageData: ChatMessage) => {
      return (
        <ChatMessageItem
          key={messageData.messageId}
          messageData={messageData}
        />
      );
    });
  };

  return <div className='messages'>{renderMessages()}</div>;
};
