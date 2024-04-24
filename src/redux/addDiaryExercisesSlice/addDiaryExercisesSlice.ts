import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storageSession from 'redux-persist/lib/storage/session';
import { ExerciseDiaryState, ExerciseDiaryTypeRedux } from './types';

const exercisesDiaryPersistConfig = {
  key: 'exercisesDiary',
  storage: storageSession,
};

const initialState: ExerciseDiaryState & ExerciseDiaryTypeRedux = {
  _id: '',
  exercisesId: '',
  name: '',
  burnedCalories: 0,
  bodyPart: '',
  target: '',
  equipment: '',
  video: '',
  exercisesDiaryData: [],
};

const exerciseDiarySlice = createSlice({
  name: 'exerciseDiary',
  initialState,
  reducers: {
    setSelectExercisesDiary: (
      state,
      action: PayloadAction<ExerciseDiaryTypeRedux>
    ) => {
      return { ...state, ...action.payload };
    },
    setExercisesDiaryData: (state, action) => {
      state.exercisesDiaryData = action.payload;
    },
  },
});

export const { setSelectExercisesDiary, setExercisesDiaryData } =
  exerciseDiarySlice.actions;

const persistedExercisesDiaryReducer = persistReducer(
  exercisesDiaryPersistConfig,
  exerciseDiarySlice.reducer
);

export default persistedExercisesDiaryReducer;
