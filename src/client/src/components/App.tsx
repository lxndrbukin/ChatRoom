import React from 'react';
import * as socketIO from 'socket.io-client';
import { Chats } from './Chats/Chats';

const socket = socketIO.connect('http://localhost:5000');

interface AppProps {
  message: string;
}

export const App: React.FC = (): JSX.Element => {
  return (
    <div className='container'>
      <Chats socket={socket} />
    </div>
  );
};
