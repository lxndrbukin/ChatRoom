import React from 'react';
import * as socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:5000');

interface AppProps {
  message: string;
}

export const App: React.FC<AppProps> = ({ message }): JSX.Element => {
  return <div>{message}</div>;
};
