import { renderHook, waitFor } from '@testing-library/react';
import useCalculateDailyRecommendation from '../useCalculateDailyCalories';
import { calculateDailyRecommendationAsync } from '@/src/redux/userData/userDataSlice';

jest.mock('../redux-hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

jest.mock('../../models/userDataModel.ts', () => ({
  userDataSchema: {
    height: String,
    currentWeight: String,
    desiredWeight: String,
    birthday: String,
    bloodGroup: String,
    sex: String,
    levelActivity: String,
  },
}));

jest.mock('../../models/users.ts', () => ({
  userSchema: {
    userData: { type: 'userDataSchema' },
  },
}));

describe('useCalculateDailyRecommendation', () => {
  it('should return userData and calculateCalories', async () => {
    const mockDispatch = jest.fn();

    const mockUserData = {
      height: 180,
      currentWeight: 90,
      birthday: new Date(2003, 7, 6),
      sex: 'male',
      levelActivity: 'sedentary',
    };
    const mockCalculateCalories = {
      dailyCalories: 2500,
    };
    const useDispatch = jest.spyOn(require('../redux-hook'), 'useAppDispatch');
    const useSelector = jest.spyOn(require('../redux-hook'), 'useAppSelector');

    useDispatch.mockReturnValue(mockDispatch);

    useSelector
      .mockReturnValueOnce(mockUserData)
      .mockReturnValueOnce(mockCalculateCalories);

    const { result } = renderHook(useCalculateDailyRecommendation);

    await waitFor(() => {
      expect(result.current.userData).toEqual(mockUserData);
    });

    expect(result.current.calculateCalories).toEqual(mockCalculateCalories);
  });
});
