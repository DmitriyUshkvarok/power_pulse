import { ExerciseCardData } from '@/src/app/actions/types/exercisesActionsTypes';

export interface ExercisesSubListProps {
  id?: string | number;
  exercisesSubListData: ExerciseCardData[];
}
