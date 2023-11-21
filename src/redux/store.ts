import persistUserDataReducer, {
  UserDataState,
} from './userData/userDataSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

export interface RootState {
  userData: UserDataState;
}

const store = configureStore({
  reducer: {
    userData: persistUserDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
