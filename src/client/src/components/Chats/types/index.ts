import { RefObject } from 'react';
import { Socket } from 'socket.io-client';
import { ChatsListItem, ChatMessage } from '../../../store';
import { useRef } from 'react';

export interface ChatSharedProps {
  socket: Socket;
}

export interface ChatsProps { }

export interface ChatBoxProps extends ChatSharedProps { }

export interface CreateChatProps extends ChatSharedProps { }

export interface ChatsListProps extends ChatSharedProps { }

export interface ChatMessagesProps {
  messages: ChatMessage[];
  typingStatus: string;
  lastMessageRef: RefObject<HTMLDivElement>;
}

export interface ChatMessageProps {
  messageData: ChatMessage;
}

export interface ChatsListItemProps {
  chat: ChatsListItem;
}