'use client';

import { dateTimeActions } from '@/redux/features/datetime';
import { selectDateTime } from '@/redux/features/datetime/selectors';
import { useAppSelector, useAppStore } from '@/redux/hooks';
import { FunctionComponent, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const DateTimeProvider: FunctionComponent<Props> = function ({
  children,
}) {
  const state = useAppSelector((state) =>
    selectDateTime(state, new Date().toString())
  );
  const store = useAppStore();
  if (!state) {
    store.dispatch(
      dateTimeActions.setNewDateTime({
        newDateTime: new Date().toString(),
        setAt: new Date().toString(),
      })
    );
  }
  return <>{children}</>;
};
