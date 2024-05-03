import { renderHook } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '../redux-hook';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('useReduxHooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('useAppDispatch returns dispatch function', () => {
    const mockDispatch = jest.fn();
    const useDispatch = jest
      .spyOn(require('react-redux'), 'useDispatch')
      .mockReturnValueOnce(mockDispatch);

    const { result } = renderHook(useAppDispatch);

    expect(result.current).toBe(mockDispatch);
    expect(useDispatch).toHaveBeenCalled();
  });

  it('useAppSelector returns selected state', () => {
    const mockSelectedState = 'mockSelectedState';
    const useSelector = jest
      .spyOn(require('react-redux'), 'useSelector')
      .mockReturnValueOnce(mockSelectedState);

    const { result } = renderHook(useAppSelector);

    expect(result.current).toBe(mockSelectedState);
    expect(useSelector).toHaveBeenCalled();
  });
});
