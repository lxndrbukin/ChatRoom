import React from 'react';

interface AppProps {
  message: string;
}

export const App: React.FC<AppProps> = ({ message }): JSX.Element => {
  return <div>{message}</div>;
};
