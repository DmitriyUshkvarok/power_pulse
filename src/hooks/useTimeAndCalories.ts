'use client';
import { useAppSelector } from './redux-hook';
import { formatDateString } from '../utils/formatDate';
import { sessionSelectors } from '../redux/globalLocalSessionStoreSlice/globalSessionSelector';

const useTimeAndCalories = () => {
  const diaryExercisesList = useAppSelector(
    (state) => state.exercisesDiary.exercisesDiaryData
  );
  const selectedDate = useAppSelector(sessionSelectors.getDate);
  const formattedDate = formatDateString(selectedDate);

  // Filter records only for the selected date
  const filterDateExercises = diaryExercisesList.filter(
    (item) => item.date === formattedDate
  );

  //  Calculation of total training time in minutes
  const totalTrainingTime = filterDateExercises.reduce(
    (acc, exercise) => acc + exercise.time,
    0
  );

  // Calculating total calories burned
  const totalBurnedCalories = filterDateExercises.reduce(
    (acc, exercise) => acc + exercise.burnedCalories,
    0
  );

  return { totalTrainingTime, totalBurnedCalories };
};

export default useTimeAndCalories;
