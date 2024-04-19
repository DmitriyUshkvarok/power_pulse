import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDiaryExercisesResponse } from '@/src/app/actions/diaryActions';
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
  video: string;
}

export interface ExerciseDiaryState {
  exercisesDiaryData: getDiaryExercisesResponse[];
}

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
