import { renderHook } from '@testing-library/react';
import { useRouterBackForDynamicPageExercises } from '../useRouterBackForDynmicPageExercises';
import { usePathname } from 'next/navigation';
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
describe('useRouterBackForDynamicPageExercise', () => {
  it('should return the correct route for body-parts exercises when id is provided', () => {
    const mockPathName = usePathname as jest.Mock;
    mockPathName.mockReturnValueOnce('/exercises/body-parts/123');

    const id = '123';
    const expectedRoute = '/exercises/body-parts';

    const { result } = renderHook(() =>
      useRouterBackForDynamicPageExercises(id)
    );

    expect(result.current).toBe(expectedRoute);
  });

  it('should return the correct route for muscles exercises when id is provided', () => {
    const mockPathName = usePathname as jest.Mock;
    mockPathName.mockReturnValueOnce('/exercises/muscles/123');

    const id = '123';
    const expectedRoute = '/exercises/muscles';

    const { result } = renderHook(() =>
      useRouterBackForDynamicPageExercises(id)
    );

    expect(result.current).toBe(expectedRoute);
  });

  it('should return the correct route for equipment exercises when id is provided', () => {
    const mockPathName = usePathname as jest.Mock;
    mockPathName.mockReturnValueOnce('/exercises/equipment/123');

    const id = '123';
    const expectedRoute = '/exercises/equipment';

    const { result } = renderHook(() =>
      useRouterBackForDynamicPageExercises(id)
    );

    expect(result.current).toBe(expectedRoute);
  });

  it('should return the default route when no id is provided', () => {
    const mockPathName = usePathname as jest.Mock;
    mockPathName.mockReturnValueOnce('/');

    const expectedRoute = '/';

    const { result } = renderHook(() => useRouterBackForDynamicPageExercises());

    expect(result.current).toBe(expectedRoute);
  });
});
