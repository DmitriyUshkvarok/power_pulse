import { persistReducer } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';

const paginationPersistConfig = {
  key: 'pagination',
  storage: storageSession,
  whitelist: ['currentPage'],
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 1,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetCurrentPage: (state) => {
      state.currentPage = 1;
    },
  },
});

const persistedPaginationReducer = persistReducer(
  paginationPersistConfig,
  paginationSlice.reducer
);

export const { setCurrentPage, resetCurrentPage } = paginationSlice.actions;

export default persistedPaginationReducer;
