import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { fetchExercises } from '@/src/redux/exerciseSlice/exerciseSlice';
import { usePathname } from 'next/navigation';

const useFilteredExercises = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const filteredExercises = useAppSelector(
    (state) => state.exercises.exercises
  );
  const exerciseStatus = useAppSelector((state) => state.exercises.status);

  useEffect(() => {
    if (exerciseStatus === 'idle') {
      dispatch(fetchExercises());
    }
  }, [dispatch, exerciseStatus]);

  const filterExercisesByCategory = () => {
    if (!filteredExercises || !Array.isArray(filteredExercises)) {
      return [];
    }

    switch (pathname) {
      case '/exercises/body-parts':
        return filteredExercises.filter(
          (exercise) => exercise.category === 'Body parts'
        );
      case '/exercises/muscles':
        return filteredExercises.filter(
          (exercise) => exercise.category === 'Muscles'
        );
      case '/exercises/equipment':
        return filteredExercises.filter(
          (exercise) => exercise.category === 'Equipment'
        );
      default:
        return filteredExercises;
    }
  };

  return filterExercisesByCategory();
};

export default useFilteredExercises;
