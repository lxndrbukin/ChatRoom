import { FormEventHandler, RefObject } from 'react';
import { Socket } from 'socket.io-client';
import { Chat, ChatMessage } from '../../../store';

export interface ChatSharedProps {
  socket: Socket;
}

export interface ChatsProps {}

export interface ChatBoxProps extends ChatSharedProps {}

export interface CreateChatProps extends ChatSharedProps {}

export interface ChatsListProps extends ChatSharedProps {}

export interface ChatMessagesProps {
  messages: ChatMessage[];
  typingStatus: string;
  lastMessageRef: RefObject<HTMLDivElement>;
}

export interface ChatMessageProps {
  messageData: ChatMessage;
}

export interface ChatsListItemProps {
  chat: Chat;
}

export interface ChatFormProps {
  handleSendMessage: FormEventHandler<HTMLFormElement>;
  handleTyping: FormEventHandler<HTMLTextAreaElement>;
}
