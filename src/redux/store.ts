import persistUserDataReducer from './userData/userDataSlice';
import persistedProductReducer from './addDiaryProductSlice/addDiaryProductSlice';
import persistedGlobalLocalSessionStoreReducer from './globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';
import persistedModalReducer from './modalSlice/modalSlice';
import persistedPaginationReducer from './paginationSlice/paginationSlice';
import exerciseSlice from './exerciseSlice/exerciseSlice';
import diarySlice from './diarySlice/diarySlice';
import exercisesSubListSlice from './exercisesSubListSlice/exercisesSubListSlice';
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

const store = configureStore({
  reducer: {
    userData: persistUserDataReducer,
    products: persistedProductReducer,
    modals: persistedModalReducer,
    diary: diarySlice,
    exercises: exerciseSlice,
    exercisesSubList: exercisesSubListSlice,
    pagination: persistedPaginationReducer,
    globalLocalSession: persistedGlobalLocalSessionStoreReducer,
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
export type RootState = ReturnType<typeof store.getState>;

export default store;
