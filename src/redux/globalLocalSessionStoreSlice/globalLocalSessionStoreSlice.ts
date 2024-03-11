import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import {
  CreateProductSuccessResponse,
  ServerError,
} from '@/src/app/actions/productActions';
import storageSession from 'redux-persist/lib/storage/session';

interface LocalSessionState {
  selectedCategory: string;
  recommendation: string;
  filteredProductData: CreateProductSuccessResponse[] | ServerError;
}

const initialState: LocalSessionState = {
  selectedCategory: '',
  recommendation: 'all',
  filteredProductData: [],
};

const globalLocalSessionStoreSlice = createSlice({
  name: 'globalLocalSessionStore',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setRecommendation: (state, action: PayloadAction<string>) => {
      state.recommendation = action.payload;
    },
    setFilteredProductData: (
      state,
      action: PayloadAction<CreateProductSuccessResponse[] | ServerError>
    ) => {
      state.filteredProductData = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setRecommendation,
  setFilteredProductData,
} = globalLocalSessionStoreSlice.actions;

const persistConfig = {
  key: 'globalLocalSessionStore',
  storage: storageSession,
};

export const persistedGlobalLocalSessionStoreReducer = persistReducer(
  persistConfig,
  globalLocalSessionStoreSlice.reducer
);

export default persistedGlobalLocalSessionStoreReducer;
