'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { calculateDailyRecommendationAsync } from '@/src/redux/userData/userDataSlice';

const useCalculateDailyRecommendation = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userData.data);
  const calculateCalories = useAppSelector(
    (state) => state.userData.calculateDailyCalories
  );

  useEffect(() => {
    if (userData) {
      dispatch(calculateDailyRecommendationAsync(userData));
    }
  }, [userData, dispatch]);

  return { userData, calculateCalories };
};

export default useCalculateDailyRecommendation;
