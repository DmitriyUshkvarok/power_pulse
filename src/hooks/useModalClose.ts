'use client';
import { useAppDispatch } from '@/src/hooks/redux-hook';
import { closeModal } from '@/src/redux/modalSlice/modalSlice';
import useAuthRedirect from './useRedirect';

const useModalClose = () => {
  const dispatch = useAppDispatch();
  const { handleRedirect } = useAuthRedirect();

  const handleCloseModal = () => {
    handleRedirect();
    dispatch(closeModal());
  };

  return handleCloseModal;
};

export default useModalClose;
