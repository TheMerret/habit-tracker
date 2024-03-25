import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { habitsReducer } from './features/habits';
import defaultStorage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  habits: habitsReducer,
});

export const makeStore = () => {
  let storage = defaultStorage;
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    const idbStorage = require('@piotr-cz/redux-persist-idb-storage').default({
      name: 'habit-tracker',
      storeName: 'habits',
    });
    if (!!idbStorage) {
      storage = idbStorage;
    }
  }
  const persistConfig = {
    key: 'root',
    storage,
    serialize: false,
    deserialize: false,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export type PersistentStore = ReturnType<typeof makeStore>;
export type AppStore = PersistentStore['store'];
export type AppPersistor = PersistentStore['persistor'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
