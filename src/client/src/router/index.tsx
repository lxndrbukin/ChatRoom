import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import * as socketIO from 'socket.io-client';
import { App } from '../components/App';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { SignupAuth } from '../components/Auth/SignupAuth';
import { LoginAuth } from '../components/Auth/LoginAuth';
import { Profile } from '../components/Profile/Profile';
import { ProfileEdit } from '../components/Profile/ProfileEdit';
import { Chats } from '../components/Chats/Chats';
import { ChatsList } from '../components/Chats/ChatsList';
import { ChatBox } from '../components/Chats/ChatBox';
import { CreateChat } from '../components/Chats/CreateChat';
import { Friends } from '../components/Friends/Friends';
import { FriendSearchForm } from '../components/Friends/FriendSearchForm';
import { FriendSearchList } from '../components/Friends/FriendSearchList';

const socket = socketIO.connect('http://localhost:5000');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App socket={socket} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/profile/:userId',
        element: <Profile />,
        children: [],
      },
      {
        path: '/profile/:userId/edit',
        element: <ProfileEdit />,
      },
      {
        path: 'IM',
        element: <Chats />,
        children: [
          {
            path: '',
            element: <ChatsList socket={socket} />,
          },
          {
            path: '/IM/:chatId',
            element: (
              <React.Fragment>
                <ChatsList socket={socket} />
                <ChatBox socket={socket} />
              </React.Fragment>
            ),
          },
          {
            path: 'create',
            element: <CreateChat socket={socket} />,
          },
        ],
      },
      {
        path: 'friends',
        element: <Friends />,
        children: [
          {
            path: 'add',
            element: (
              <React.Fragment>
                <FriendSearchForm socket={socket} />
                <FriendSearchList />
              </React.Fragment>
            ),
          },
        ],
      },
      {
        path: 'settings',
        element: <div>Settings</div>,
      },
      {
        path: 'signup',
        element: <SignupAuth />,
      },
      {
        path: 'login',
        element: <LoginAuth />,
      },
    ],
  },
]);
