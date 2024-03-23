import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateDiarySuccessResponse,
  getDiaryProducts,
} from '@/src/app/actions/diaryActions';

export interface DiaryState {
  diaryProducts: CreateDiarySuccessResponse[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DiaryState = {
  diaryProducts: [],
  status: 'idle',
  error: null,
};

export const fetchDiaryProducts = createAsyncThunk<
  CreateDiarySuccessResponse[],
  string
>('diary/fetchDiaryProducts', async (userId: string, thunkAPI) => {
  try {
    const diaryProducts = await getDiaryProducts(userId);
    return diaryProducts || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
});

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
      });
  },
});

export default diarySlice.reducer;
