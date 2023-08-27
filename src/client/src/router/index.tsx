import { createBrowserRouter } from 'react-router-dom';
import * as socketIO from 'socket.io-client';
import { App } from '../components/App';
import { SignupAuth } from '../components/Auth/SignupAuth';
import { LoginAuth } from '../components/Auth/LoginAuth';
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
