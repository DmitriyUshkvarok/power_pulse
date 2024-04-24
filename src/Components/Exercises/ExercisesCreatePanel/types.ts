import { ExerciseList } from '@/src/app/actions/types/exercisesActionsTypes';

export interface ExercisesListProps {
  id?: string | number;
  exerciseList: ExerciseList[];
}
