'use client';

import { Provider } from 'react-redux';
import { FunctionComponent, ReactNode, useRef } from 'react';
import { makeStore, AppStore, PersistentStore } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  children: ReactNode;
};

export const StoreProvider: FunctionComponent<Props> = function ({
  children,
}) {
  const persistentStoreRef = useRef<PersistentStore | null>(null);
  if (!persistentStoreRef.current) {
    persistentStoreRef.current = makeStore();
  }
  return (
    <Provider store={persistentStoreRef.current.store}>
      <PersistGate
        loading={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
        persistor={persistentStoreRef.current.persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};
