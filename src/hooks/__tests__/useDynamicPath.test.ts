import { renderHook } from '@testing-library/react';
import { useDynamicPath } from '../useDynamicPath';
import { usePathname } from 'next/navigation';

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('useDynamicPath', () => {
  it('should return the correct path when no params are passed in', () => {
    const { result } = renderHook(useDynamicPath);
    expect(result.current).toBe('/');
    expect(typeof result.current).toEqual('string');
  });

  it('should correctly accept the id argument', () => {
    const id = '123';
    renderHook(() => useDynamicPath(id));
    expect(usePathname).toHaveBeenCalled();
  });

  it('should return the correct path with id', () => {
    const id = '123';
    mockUsePathname.mockReturnValue(`/exercises/body-parts/${id}`);
    const { result } = renderHook(() => useDynamicPath(id));
    expect(result.current).toBe(`/body-parts/${id}`);
  });

  it('should return the correct path for "/exercises/body-parts', () => {
    mockUsePathname.mockReturnValue('/exercises/body-parts');
    const { result } = renderHook(() => useDynamicPath());
    expect(result.current).toBe('/body-parts/');
  });

  it('should return the correct path for "/exercises/muscles', () => {
    mockUsePathname.mockReturnValue('/exercises/muscles');
    const { result } = renderHook(() => useDynamicPath());
    expect(result.current).toBe('/muscles/');
  });

  it('should return the correct path for "/exercises/equipment', () => {
    mockUsePathname.mockReturnValue('/exercises/equipment');
    const { result } = renderHook(() => useDynamicPath());
    expect(result.current).toBe('/equipment/');
  });

  it('should return the correct path for "/exercises/body-parts/:id" case', () => {
    const id = '123';
    mockUsePathname.mockReturnValue(`/exercises/body-parts/${id}`);
    const { result } = renderHook(() => useDynamicPath(id));
    expect(result.current).toBe(`/body-parts/${id}`);
  });

  it('should return the correct path for "/exercises/muscles/:id" case', () => {
    const id = '123';
    mockUsePathname.mockReturnValue(`/exercises/muscles/${id}`);
    const { result } = renderHook(() => useDynamicPath(id));
    expect(result.current).toBe(`/muscles/${id}`);
  });

  it('should return the correct path for "/exercises/equipment/:id" case', () => {
    const id = '123';
    mockUsePathname.mockReturnValue(`/exercises/equipment/${id}`);
    const { result } = renderHook(() => useDynamicPath(id));
    expect(result.current).toBe(`/equipment/${id}`);
  });

  it('should return the correct path when id is passed for the "/exercises/body-parts/:id/add-diary-exercises" case', () => {
    const id = '123';
    mockUsePathname.mockReturnValue(
      `/exercises/body-parts/${id}/add-diary-exercises`
    );
    const { result } = renderHook(() => useDynamicPath(id));
    expect(result.current).toBe(`/body-parts/${id}`);
  });

  it('should return the correct path for "/exercises/muscles/:id/add-diary-exercises" case', () => {
    const id = '123';
    mockUsePathname.mockReturnValue(
      `/exercises/muscles/${id}/add-diary-exercises`
    );
    const { result } = renderHook(() => useDynamicPath(id));
    expect(result.current).toBe(`/muscles/${id}`);
  });

  it('should return the correct path for "/exercises/equipment/:id/add-diary-exercises" case', () => {
    const id = '123';
    mockUsePathname.mockReturnValue(
      `/exercises/equipment/${id}/add-diary-exercises`
    );
    const { result } = renderHook(() => useDynamicPath(id));
    expect(result.current).toBe(`/equipment/${id}`);
  });
});
