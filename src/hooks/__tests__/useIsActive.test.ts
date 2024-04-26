import { renderHook } from '@testing-library/react';
import useIsActive from '../useIsActive';
import { usePathname } from 'next/navigation';

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('useIsActive', () => {
  it('should return true if the current pathname matches the given path', () => {
    mockUsePathname.mockReturnValue('/example');
    const { result } = renderHook(useIsActive);
    const isActive = result.current('/example');
    expect(isActive).toBe(true);
  });

  it('should return false if the current pathname does not match the given path', () => {
    mockUsePathname.mockReturnValue('/example');
    const { result } = renderHook(useIsActive);
    const isNotActive = result.current('/not-active');
    expect(isNotActive).toBe(false);
  });

  it('should return true if the current pathname starts with "/exercises/muscles"', () => {
    mockUsePathname.mockReturnValue('/exercises/muscles/examle');
    const { result } = renderHook(useIsActive);
    const isActive = result.current('/exercises/muscles');
    expect(isActive).toBe(true);
  });

  it('should return true if the current pathname starts with "/exercises/equipment"', () => {
    mockUsePathname.mockReturnValue('/exercises/equipment/example');

    const { result } = renderHook(useIsActive);
    const isActive = result.current('/exercises/equipment');

    expect(isActive).toBe(true);
  });
});
