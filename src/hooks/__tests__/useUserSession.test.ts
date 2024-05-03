import { renderHook, act } from '@testing-library/react';
import useUserSession from '../useUserSession';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

const sessionMock = jest.spyOn(require('next-auth/react'), 'useSession');
describe('useUserSession hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('returns default values when session is not available', () => {
    sessionMock.mockReturnValueOnce({ data: null });

    const { result } = renderHook(useUserSession);

    expect(result.current.session).toBeNull();
    expect(result.current.userId).toBeUndefined();
    expect(result.current.userDataId).toBeUndefined();
    expect(result.current.update).toBeUndefined();
  });

  it('returns session data correctly', () => {
    const mockSessionData = {
      user: {
        _id: 'mockUserId',
        userData: 'mockUserDataId',
      },
    };

    sessionMock.mockReturnValueOnce({ data: mockSessionData });

    const { result } = renderHook(useUserSession);

    expect(result.current.session).toEqual(mockSessionData);
    expect(result.current.userId).toBe('mockUserId');
    expect(result.current.userDataId).toBe('mockUserDataId');
    expect(result.current.update).toBeUndefined();
  });

 it('updates session correctly', () => {
    const mockSessionData = {
      user: {
        _id: 'mockUserId',
        userData: 'mockUserDataId',
      },
    };
    const mockUpdateFunction = jest.fn();
    sessionMock.mockReturnValueOnce({
      data: mockSessionData,
      update: mockUpdateFunction,
    });

    const { result } = renderHook(useUserSession);

    expect(result.current.session).toEqual(mockSessionData);
    expect(result.current.userId).toBe('mockUserId');
    expect(result.current.userDataId).toBe('mockUserDataId');

    const newSessionData = {
      user: {
        _id: 'newMockUserId',
        userData: 'newMockUserDataId',
      },
    };
    act(() => {
      result.current.update(newSessionData);
    });

    expect(mockUpdateFunction).toHaveBeenCalledWith(newSessionData);
  });
});
