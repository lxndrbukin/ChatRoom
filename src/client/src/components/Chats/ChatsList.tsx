import React, { useEffect } from 'react';
import { ChatsListProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, fetchAllChats } from '../../store';
import { ChatsListItem } from './ChatsListItem';

export const ChatsList: React.FC<ChatsListProps> = ({
  socket,
}): JSX.Element => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.session);
  const { chatsList } = useSelector((state: RootState) => state.chats);

  useEffect(() => {
    if (userData) {
      if (userData.userId) {
        socket.emit('event://fetch-chats');
        socket.on('event://fetch-chats-res', (data) => {
          dispatch(fetchAllChats(data));
        });
      }
    }
  }, [socket]);

  const renderChatList = (): JSX.Element | JSX.Element[] => {
    if (chatsList) {
      return chatsList.map((chat) => {
        return <ChatsListItem chat={chat} />;
      });
    }
    return <div className="loading-spinner">Loading...</div>;
  };

  return (
    <div className="chats-list-wrapper">
      <div className="chats-list">{renderChatList()}</div>
    </div>
  );
};
