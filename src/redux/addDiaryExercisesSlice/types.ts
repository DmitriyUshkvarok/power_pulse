import { getDiaryExercisesResponse } from '@/src/app/actions/types/diaryActionsTypes';

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
