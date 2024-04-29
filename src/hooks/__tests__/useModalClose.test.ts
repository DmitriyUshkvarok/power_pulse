import { renderHook } from '@testing-library/react';
import { closeModal } from '@/src/redux/modalSlice/modalSlice';
import { resetCaloriesBurned } from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';
import useModalClose from '../useModalClose';

jest.mock('../redux-hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../../hooks/useRedirect', () => jest.fn());

describe(useModalClose, () => {
  it('should call handleRedirect and dispatch closeModal and resetCaloriesBurned', () => {
    const useDispatch = jest.spyOn(require('../redux-hook'), 'useAppDispatch');
    const mockHandleRedirect = require('../../hooks/useRedirect');

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const handleRedirect = jest.fn();
    mockHandleRedirect.mockReturnValue({ handleRedirect });

    const { result } = renderHook(useModalClose);
    result.current();

    expect(handleRedirect).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(closeModal());
    expect(dispatch).toHaveBeenCalledWith(resetCaloriesBurned());
  });
});
