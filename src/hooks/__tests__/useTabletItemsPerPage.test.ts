import { renderHook } from '@testing-library/react';
import useTabletItemsPerPage from '../useTabletItemsPerPage';

describe('useTabletItemsPerPage', () => {
  it('should return 9 when the screen width is between 768px and 960px', () => {
    jest
      .spyOn(require('react-responsive'), 'useMediaQuery')
      .mockReturnValue(true);
    const { result } = renderHook(useTabletItemsPerPage);

    expect(result.current).toBe(9);
  });

  it('should return 10 when the screen width is exactly 768px', () => {
    jest
      .spyOn(require('react-responsive'), 'useMediaQuery')
      .mockReturnValue(false);
    const { result } = renderHook(useTabletItemsPerPage);

    expect(result.current).toBe(10);
  });
});
