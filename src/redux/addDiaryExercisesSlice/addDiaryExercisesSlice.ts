import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storageSession from 'redux-persist/lib/storage/session';

export interface ExerciseDiaryTypeRedux {
  _id: string;
  exercisesId: string;
  name: string;
  burnedCalories: number;
  bodyPart: string;
  target: string;
  equipment: string;
}

const exercisesDiaryPersistConfig = {
  key: 'exercisesDiary',
  storage: storageSession,
};

const initialState: ExerciseDiaryTypeRedux = {
  _id: '',
  exercisesId: '',
  name: '',
  burnedCalories: 0,
  bodyPart: '',
  target: '',
  equipment: '',
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
  },
});

export const { setSelectExercisesDiary } = exerciseDiarySlice.actions;

const persistedExercisesDiaryReducer = persistReducer(
  exercisesDiaryPersistConfig,
  exerciseDiarySlice.reducer
);

export default persistedExercisesDiaryReducer;
