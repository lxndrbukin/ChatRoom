import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import * as socketIO from 'socket.io-client';
import { App } from '../components/App';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { SignupAuth } from '../components/Auth/SignupAuth';
import { LoginAuth } from '../components/Auth/LoginAuth';
import { Profile } from '../components/Profile/Profile';
import { ProfileEdit } from '../components/Profile/ProfileEdit';
import { ProfileEditMain } from '../components/Profile/ProfileEditMain';
import { ProfileEditMainForm } from '../components/Profile/ProfileEditMainForm';
import { ProfileEditContactForm } from '../components/Profile/ProfileEditContactForm';
import { Chats } from '../components/Chats/Chats';
import { ChatsList } from '../components/Chats/ChatsList';
import { ChatBox } from '../components/Chats/ChatBox';
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
        element: <Profile socket={socket} />,
        children: [],
      },
      {
        path: '/profile/:userId/edit',
        element: <ProfileEdit />,
        children: [
          {
            path: '',
            element: (
              <ProfileEditMain header='Profile'>
                <ProfileEditMainForm />
              </ProfileEditMain>
            ),
          },
          {
            path: 'contacts',
            element: (
              <ProfileEditMain header='Contacts'>
                <ProfileEditContactForm />
              </ProfileEditMain>
            ),
          },
        ],
      },
      {
        path: 'IM',
        element: <Chats />,
        children: [
          {
            path: '/IM',
            element: (
              <React.Fragment>
                <ChatsList socket={socket} />
                <ChatBox socket={socket} />
              </React.Fragment>
            ),
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
