import { renderHook } from '@testing-library/react';
import useAuthRedirect from '../useRedirect';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../redux-hook.ts', () => ({
  useAppSelector: jest.fn(() => '/dashboard'),
}));

describe(useAuthRedirect, () => {
  it('should return obj with correct properties', () => {
    const { result } = renderHook(useAuthRedirect);

    expect(result.current).toHaveProperty('handleRedirect');
    expect(typeof result.current.handleRedirect).toBe('function');
  });

  it('should call router.push with previous route if it exists', () => {
    const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');
    const useAppSelector = jest.spyOn(
      require('../redux-hook.ts'),
      'useAppSelector'
    );
    const mockPush = jest.fn();
    const mockUseRouter = {
      push: mockPush,
    };
    useRouter.mockReturnValue(mockUseRouter);

    const mockPreviousRoute = '/previousRoute';
    useAppSelector.mockReturnValue(mockPreviousRoute);

    const { result } = renderHook(useAuthRedirect);
    result.current.handleRedirect();

    expect(mockPush).toHaveBeenCalledWith(mockPreviousRoute);
  });
});
