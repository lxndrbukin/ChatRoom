import React from 'react';

export const ProfilePosts: React.FC = (): JSX.Element => {
  return (
    <div className='profile-posts box'>
      <div className='profile-posts-header box-header'>My Posts</div>
      <div className='profile-posts-list'></div>
    </div>
  );
};
