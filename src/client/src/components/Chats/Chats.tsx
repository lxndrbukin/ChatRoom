import React from 'react';
import { Socket } from 'socket.io-client';

interface ChatsProps {
  socket: Socket;
}

export const Chats: React.FC<ChatsProps> = ({ socket }): JSX.Element => {
  return <div>Chats</div>;
};
