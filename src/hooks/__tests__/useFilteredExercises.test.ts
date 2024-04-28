import { renderHook, waitFor } from '@testing-library/react';
import useFilteredExercises from '../useFilteredExercises';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('../redux-hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

jest.mock('../../models/exerciseModel.ts', () => ({
  exerciseSchema: {
    title: String,
    imageURL: String,
    category: String,
  },
}));

jest.mock('../../models/exerciseCard.model.ts', () => ({
  exerciseCardSchema: {
    name: String,
    burnedCalories: Number,
    bodyPart: String,
    target: String,
    exercisesId: String,
    equipment: String,
    video: String,
  },
}));

jest.mock('../../models/users.ts', () => ({
  userSchema: {
    userData: { type: 'userDataSchema' },
  },
}));

describe('useFilteredExercises', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return an empty array if the input array is empty', async () => {
    const { result } = renderHook(useFilteredExercises);

    await waitFor(() => {
      expect(result.current).toEqual([]);
    });
  });

  it('should return the same array if the input array does not contain any exercises that match the filter', () => {
    const usePathname = jest.spyOn(require('next/navigation'), 'usePathname');
    const useSelector = jest.spyOn(require('../redux-hook'), 'useAppSelector');

    useSelector.mockReturnValue([]);
    usePathname.mockReturnValue('/exercises/arms');

    const { result } = renderHook(useFilteredExercises);
    expect(result.current).toEqual([]);
  });

  it('should return exercises filtered by category when pathname matches (body-parts)', () => {
    const filteredExercises = [
      { title: 'Exercise 1', category: 'Body parts' },
      { title: 'Exercise 2', category: 'Muscles' },
      { title: 'Exercise 3', category: 'Equipment' },
    ];

    const usePathname = jest.spyOn(require('next/navigation'), 'usePathname');
    const useSelector = jest.spyOn(require('../redux-hook'), 'useAppSelector');

    useSelector.mockReturnValue(filteredExercises);
    usePathname.mockReturnValue('/exercises/body-parts');

    const expectedFilteredExercises = filteredExercises.filter(
      (exercise) => exercise.category === 'Body parts'
    );

    const { result } = renderHook(useFilteredExercises);
    expect(result.current).toEqual(expectedFilteredExercises);
  });

  it('should return exercises filtered by category when pathname matches (Muscles)', () => {
    const filteredExercises = [
      { title: 'Exercise 1', category: 'Body parts' },
      { title: 'Exercise 2', category: 'Muscles' },
      { title: 'Exercise 3', category: 'Equipment' },
    ];

    const usePathname = jest.spyOn(require('next/navigation'), 'usePathname');
    const useSelector = jest.spyOn(require('../redux-hook'), 'useAppSelector');

    useSelector.mockReturnValue(filteredExercises);
    usePathname.mockReturnValue('/exercises/muscles');

    const expectedFilteredExercises = filteredExercises.filter(
      (exercise) => exercise.category === 'Muscles'
    );

    const { result } = renderHook(useFilteredExercises);
    expect(result.current).toEqual(expectedFilteredExercises);
  });

  it('should return exercises filtered by category when pathname matches (Equipment)', () => {
    const filteredExercises = [
      { title: 'Exercise 1', category: 'Body parts' },
      { title: 'Exercise 2', category: 'Muscles' },
      { title: 'Exercise 3', category: 'Equipment' },
    ];

    const usePathname = jest.spyOn(require('next/navigation'), 'usePathname');
    const useSelector = jest.spyOn(require('../redux-hook'), 'useAppSelector');

    useSelector.mockReturnValue(filteredExercises);
    usePathname.mockReturnValue('/exercises/equipment');

    const expectedFilteredExercises = filteredExercises.filter(
      (exercise) => exercise.category === 'Equipment'
    );

    const { result } = renderHook(useFilteredExercises);
    expect(result.current).toEqual(expectedFilteredExercises);
  });

  it.todo('should dispatch fetchExercises if exerciseStatus is idle');
});
