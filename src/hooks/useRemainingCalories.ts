'use client';
import { sessionSelectors } from '../redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { formatDateString } from '../utils/formatDate';
import { useAppSelector } from './redux-hook';

const useRemainingCalories = () => {
  const dailyCalories = useAppSelector(
    (state) => state.userData.calculateDailyCalories.recommendedCalories
  );
  const diaryProducts = useAppSelector((state) => state.diary.diaryProducts);

  const selectedDate = useAppSelector(sessionSelectors.getDate);

  const formattedDate = formatDateString(selectedDate);

  const filterDateCalories = diaryProducts
    .filter((product) => product.date === formattedDate)
    .reduce((totalCalories, product) => {
      return totalCalories + parseFloat(product.calories);
    }, 0);

  const remainingCalories = dailyCalories - filterDateCalories;

  return { remainingCalories, consumedCalories: filterDateCalories };
};

export default useRemainingCalories;
