import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

export interface ProductTypeRedux {
  _id: string;
  name: string;
  calories: string;
  category: string;
  weight: string;
  recommended: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface ProductState {
  selectedProduct: ProductTypeRedux | null;
}

const productPersistConfig = {
  key: 'product',
  storage: storageSession,
};

const initialState: ProductState = {
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<ProductTypeRedux>) => {
      if (action.payload.updatedAt !== undefined) {
        action.payload.updatedAt = action.payload.updatedAt.toString();
      }
      if (action.payload.createdAt !== undefined) {
        action.payload.createdAt = action.payload.createdAt.toString();
      }
      state.selectedProduct = action.payload;
    },
    resetSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { setSelectedProduct, resetSelectedProduct } =
  productSlice.actions;

const persistedProductReducer = persistReducer(
  productPersistConfig,
  productSlice.reducer
);

export default persistedProductReducer;
