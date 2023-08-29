import { createBrowserRouter } from 'react-router-dom';
import * as socketIO from 'socket.io-client';
import { App } from '../components/App';
import { SignupAuth } from '../components/Auth/SignupAuth';
import { LoginAuth } from '../components/Auth/LoginAuth';
import { Chats } from '../components/Chats/Chats';
import { ChatsList } from '../components/Chats/ChatsList';
import { ChatBox } from '../components/Chats/ChatBox';
import { CreateChat } from '../components/Chats/CreateChat';

const socket = socketIO.connect('http://localhost:5000');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'IM',
        element: <Chats />,
        children: [
          {
            path: 'IM',
            element: <ChatsList socket={socket} />,
          },
          {
            path: ':chatId',
            element: <ChatBox socket={socket} />,
          },
          {
            path: 'create-chat',
            element: <CreateChat socket={socket} />,
          },
        ],
      },
      {
        path: 'settings',
        element: <div>Settings</div>,
      },
      {
        path: 'signup',
        element: (
          <div className='auth'>
            <SignupAuth socket={socket} />
          </div>
        ),
      },
      {
        path: 'login',
        element: (
          <div className='auth'>
            <LoginAuth />
          </div>
        ),
      },
    ],
  },
]);
