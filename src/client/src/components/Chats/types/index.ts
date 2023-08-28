import { Socket } from 'socket.io-client';

export interface ChatSharedProps {
  socket: Socket;
}

export interface ChatsProps extends ChatSharedProps { }

export interface ChatBoxProps extends ChatSharedProps { }

export interface CreateChatProps extends ChatSharedProps { }