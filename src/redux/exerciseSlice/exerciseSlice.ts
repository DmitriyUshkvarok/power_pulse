import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getExerciseSubCategory } from '@/src/app/actions/exercisesActions';
import { ExerciseState, Exercise } from './types';

const initialState: ExerciseState = {
  exercises: [],
  status: 'idle',
  error: null,
};

export const fetchExercises = createAsyncThunk<Exercise[], void>(
  'exercises/fetchExercises',
  async (_, thunkAPI) => {
    try {
      const exercises = await getExerciseSubCategory();
      return exercises || [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exercises = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch exercises.';
      });
  },
});

export default exerciseSlice.reducer;
