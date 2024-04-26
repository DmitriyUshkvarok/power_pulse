import { renderHook } from '@testing-library/react';
import { useEscapeKey } from '../useEscapeKey';

describe('useEscapeKey', () => {
  it('should call callback when "Escape" key is pressed', () => {
    const mockCallback = jest.fn();
    const { unmount } = renderHook(() => useEscapeKey(mockCallback));
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(mockCallback).toHaveBeenCalled();
    unmount();
  });

  it('should add and remove event listener', () => {
    const mockAddEventListener = jest.spyOn(document, 'addEventListener');
    const mockRemoveEventListener = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useEscapeKey(() => {}));
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });
});
