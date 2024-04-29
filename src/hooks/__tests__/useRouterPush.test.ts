import { renderHook } from '@testing-library/react';
import useRouterPush from '../useRouter';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('useRouterPush', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should push route correctly', () => {
    const pushMock = jest.fn();
    const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');
    useRouter.mockReturnValue({ push: pushMock });

    const { result } = renderHook(() => useRouterPush());

    const { pushRoute } = result.current;

    const route = '/example-route';
    pushRoute(route);
    expect(pushMock).toHaveBeenCalledWith(route);
  });

  it('should push multiple routes correctly', () => {
    const pushMock = jest.fn();
    const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');
    useRouter.mockReturnValue({ push: pushMock });
    const { result } = renderHook(() => useRouterPush());
    const { pushRoute } = result.current;

    const route1 = '/example-route-1';
    const route2 = '/example-route-2';

    pushRoute(route1);
    pushRoute(route2);

    expect(pushMock).toHaveBeenCalledTimes(2);
    expect(pushMock).toHaveBeenNthCalledWith(1, route1);
    expect(pushMock).toHaveBeenNthCalledWith(2, route2);
  });
});
