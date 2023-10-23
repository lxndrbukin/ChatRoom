import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineSend } from 'react-icons/ai';
import { RootState } from '../../store';

export const ProfilePostForm: React.FC = (): JSX.Element => {
  const { profile } = useSelector((state: RootState) => state);

  return (
    <div className='profile-post-form box'>
      <img className='profile-post-form-avatar' src='' alt='' />
      <form>
        <textarea placeholder='Something new happened?' />
        <button>
          <AiOutlineSend size={20} />
        </button>
      </form>
    </div>
  );
};
