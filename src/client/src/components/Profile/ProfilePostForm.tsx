import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AiOutlineSend } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';

export const ProfilePostForm: React.FC = (): JSX.Element | null => {
  const { profile, session } = useSelector((state: RootState) => state);
  const [showEmojis, setShowEmojis] = useState(false);
  const [text, setText] = useState('');

  const renderEmojisBox = (): JSX.Element => {
    return (
      <div className='profile-post-emojis-box-wrapper'>
        <EmojiPicker
          onEmojiClick={(emojiData) => setText(text + emojiData.emoji)}
        />
      </div>
    );
  };

  if (profile.info?.userId === session.userData?.userId) {
    return (
      <div className='profile-post-form box'>
        <img
          className='profile-post-form-avatar'
          src={profile.info?.mainPhoto}
          alt=''
        />
        <form>
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder='Something new happened?'
          />
          <div
            onMouseOver={() => setShowEmojis(true)}
            onMouseOut={() => setShowEmojis(false)}
            className='profile-post-emojis-wrapper'
          >
            <BsEmojiSmile
              onClick={() => setShowEmojis(!showEmojis)}
              size={25}
            />
            {showEmojis && renderEmojisBox()}
          </div>
        </form>
      </div>
    );
  }
  return null;
};
