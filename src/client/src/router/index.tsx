import { createBrowserRouter } from 'react-router-dom';
import * as socketIO from 'socket.io-client';
import { App } from '../components/App';
import { Chats } from '../components/Chats/Chats';

const socket = socketIO.connect('http://localhost:5000');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'IM',
        element: <Chats socket={socket} />,
      },
      {
        path: 'settings',
        element: <div>Settings</div>,
      },
    ],
  },
]);
