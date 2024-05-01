import { renderHook, waitFor } from '@testing-library/react';
import useTimeAndCalories from '../useTimeAndCalories';
jest.mock('../redux-hook', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('../../utils/formatDate', () => ({
  formatDateString: jest.fn(),
}));
describe('useTimeAndCalories', () => {
  it('should return the total time and calories', () => {
    const selectedDate = '23/04/2024';
    const exercisesDiaryData = [
      {
        _id: '66280d74ea54ae43134b5b9a',
        name: 'qweqwe',
        target: 'test',
        bodyPart: 'wer',
        equipment: 'qwe',
        time: 5,
        burnedCalories: 0.18,
        date: '23/04/2024',
      },
      {
        _id: '66280d74ea54ae43134b5b9b',
        name: 'asd',
        target: 'test',
        bodyPart: 'wer',
        equipment: 'qwe',
        time: 10,
        burnedCalories: 0.36,
        date: '23/04/2024',
      },
    ];
    const formatDateString = jest.spyOn(
      require('../../utils/formatDate'),
      'formatDateString'
    );
    const useSelector = jest.spyOn(require('../redux-hook'), 'useAppSelector');
    useSelector.mockReturnValueOnce(exercisesDiaryData);
    useSelector.mockReturnValueOnce(selectedDate);
    formatDateString.mockReturnValueOnce(selectedDate);

    const { result } = renderHook(() => useTimeAndCalories());

    expect(formatDateString).toHaveBeenCalledWith(selectedDate);
    expect(result.current).toEqual({
      totalTrainingTime: 15,
      totalBurnedCalories: 0.54,
    });
  });
});
