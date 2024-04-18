'use client';
import { useAppDispatch } from '@/src/hooks/redux-hook';
import { closeModal } from '@/src/redux/modalSlice/modalSlice';
import { resetCaloriesBurned } from '../redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';
import useAuthRedirect from './useRedirect';

const useModalClose = () => {
  const dispatch = useAppDispatch();
  const { handleRedirect } = useAuthRedirect();

  const handleCloseModal = () => {
    handleRedirect();
    dispatch(closeModal());
    dispatch(resetCaloriesBurned());
  };

  return handleCloseModal;
};

export default useModalClose;
