'use client';

import { FC, useEffect } from 'react';

export const NotificationManager: FC = () => {
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);
  return <></>;
};
