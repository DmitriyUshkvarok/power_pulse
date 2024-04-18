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
  searchText: string;
  productData: CreateProductSuccessResponse[] | ServerError;
  filteredProductData: CreateProductSuccessResponse[] | ServerError;
  dynamicCalories: string;
  previousRouteForRedirect: string | null;
  routingRelatedAuthCompleted: boolean;
  date: string;
  dynamicExercisesPageId: string | number;
  caloriesBurned: number;
  remainingTime: number;
}

const initialState: LocalSessionState = {
  selectedCategory: '',
  recommendation: 'all',
  searchText: '',
  productData: [],
  filteredProductData: [],
  dynamicCalories: '',
  previousRouteForRedirect: null,
  routingRelatedAuthCompleted: false,
  date: new Date().toISOString(),
  dynamicExercisesPageId: '',
  caloriesBurned: 0,
  remainingTime: 0,
};

const globalLocalSessionStoreSlice = createSlice({
  name: 'globalLocalSessionStore',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    searchFilterProductData: (state) => {
      if (Array.isArray(state.productData)) {
        const { searchText, productData } = state;
        state.filteredProductData = productData.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      if (Array.isArray(state.productData)) {
        state.filteredProductData = state.productData.filter((product) => {
          const categoryMatch =
            !state.selectedCategory ||
            product.category === state.selectedCategory;
          const recommendationMatch =
            state.recommendation === 'all' ||
            product.recommended === (state.recommendation === 'recommended');
          return categoryMatch && recommendationMatch;
        });
      }
    },
    setRecommendation: (state, action: PayloadAction<string>) => {
      state.recommendation = action.payload;
      if (Array.isArray(state.productData)) {
        state.filteredProductData = state.productData.filter((product) => {
          const categoryMatch =
            !state.selectedCategory ||
            product.category === state.selectedCategory;
          const recommendationMatch =
            state.recommendation === 'all' ||
            product.recommended === (state.recommendation === 'recommended');
          return categoryMatch && recommendationMatch;
        });
      }
    },
    setFilteredProductData: (
      state,
      action: PayloadAction<CreateProductSuccessResponse[] | ServerError>
    ) => {
      state.productData = action.payload;
      if (Array.isArray(action.payload)) {
        state.filteredProductData = action.payload.filter((product) => {
          const categoryMatch =
            !state.selectedCategory ||
            product.category === state.selectedCategory;
          const recommendationMatch =
            state.recommendation === 'all' ||
            product.recommended === (state.recommendation === 'recommended');
          return categoryMatch && recommendationMatch;
        });
      }
    },
    setDynamicCalories: (state, action: PayloadAction<string>) => {
      state.dynamicCalories = action.payload;
    },
    addPreviousRouteForRedirect: (state, action: PayloadAction<string>) => {
      if (!state.routingRelatedAuthCompleted) {
        state.previousRouteForRedirect = action.payload;
      }
    },
    setRoutingRelatedAuthCompleted: (state, action: PayloadAction<boolean>) => {
      state.routingRelatedAuthCompleted = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setDynamicExercisesPageId: (
      state,
      action: PayloadAction<string | number>
    ) => {
      state.dynamicExercisesPageId = action.payload;
    },
    setCaloriesBurned: (state, action: PayloadAction<number>) => {
      state.caloriesBurned = action.payload;
    },
    resetCaloriesBurned: (state) => {
      state.caloriesBurned = 0;
    },
    setRemainingTime: (state, action: PayloadAction<number>) => {
      state.remainingTime = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setRecommendation,
  setFilteredProductData,
  setSearchText,
  searchFilterProductData,
  setDynamicCalories,
  addPreviousRouteForRedirect,
  setRoutingRelatedAuthCompleted,
  setDate,
  setDynamicExercisesPageId,
  setCaloriesBurned,
  setRemainingTime,
  resetCaloriesBurned,
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
