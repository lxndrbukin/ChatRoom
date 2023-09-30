import React from 'react';
import { useParams, Link } from 'react-router-dom';

export const Profile: React.FC = (): JSX.Element => {
  const { userId } = useParams();

  return (
    <div>
      <div>Profile</div>
      <Link to={`/profile/${userId}/edit`}>Edit Profile</Link>
    </div>
  );
};
