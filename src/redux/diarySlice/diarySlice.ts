import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DiaryState } from './types';
import { DiaryProduct } from '@/src/app/actions/types/diaryActionsTypes';
import {
  getDiaryProducts,
  deletedDiaryProduct,
} from '@/src/app/actions/diaryActions';

const initialState: DiaryState = {
  diaryProducts: [],
  status: 'idle',
  error: null,
};

export const fetchDiaryProducts = createAsyncThunk<DiaryProduct[], string>(
  'diary/fetchDiaryProducts',
  async (userId: string, thunkAPI) => {
    try {
      const diaryProducts = await getDiaryProducts(userId);
      return diaryProducts || [];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteDiaryProduct = createAsyncThunk<void, string>(
  'diary/deleteDiaryProduct',
  async (productId: string, thunkAPI) => {
    try {
      await deletedDiaryProduct(productId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaryProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiaryProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.diaryProducts = action.payload;
      })
      .addCase(fetchDiaryProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteDiaryProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteDiaryProduct.fulfilled, (state, action) => {
        state.diaryProducts = state.diaryProducts.filter(
          (product) => product._id !== action.meta.arg
        );
      });
  },
});

export default diarySlice.reducer;
