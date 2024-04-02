import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getExerciseCardsByUserId,
  createExerciseCards,
  ExerciseCardData,
  ExerciseData,
} from '@/src/app/actions/exercisesActions';

export interface ExerciseState {
  exerciseCards: ExerciseCardData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExerciseState = {
  exerciseCards: [],
  status: 'idle',
  error: null,
};

export const addExerciseCard = createAsyncThunk(
  'exercise/addExerciseCard',
  async (
    { data, userId }: { data: ExerciseData; userId: string },
    thunkAPI
  ) => {
    try {
      const response = await createExerciseCards(data, userId);
      return response;
    } catch (error) {
      console.log('Error creating exercise card:', error);
      throw error;
    }
  }
);

export const fetchExerciseCards = createAsyncThunk<ExerciseCardData[], string>(
  'exercise/fetchExerciseCards',
  async (userId: string, thunkAPI) => {
    try {
      const exerciseCards = await getExerciseCardsByUserId(userId);
      return exerciseCards || [];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const exercisesSudListSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExerciseCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExerciseCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exerciseCards = action.payload;
      })
      .addCase(fetchExerciseCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addExerciseCard.fulfilled, (state, action) => {
        state.exerciseCards.push(action.payload);
      });
  },
});

export default exercisesSudListSlice.reducer;
