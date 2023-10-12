import React from 'react';
import { HeaderNotificationProps } from './types';

export const HeaderNotification: React.FC<HeaderNotificationProps> = ({
  children,
}): JSX.Element => {
  return <div className='header-notification'>{children}</div>;
};
