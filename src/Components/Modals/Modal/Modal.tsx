'use client';
import styles from './_modal.module.scss';
import useAuthRedirect from '@/src/hooks/useRedirect';
import { useEscapeKey } from '@/src/hooks/useEscapeKey';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { closeModal } from '@/src/redux/modalSlice/modalSlice';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
interface RootLayoutProps {
  children: React.ReactNode;
}

const Modal = ({ children }: RootLayoutProps) => {
  const dispatch = useAppDispatch();
  const { handleRedirect } = useAuthRedirect();

  const isModalOpen = useAppSelector(modalsSelectors.getIsModalOpen);

  const handleCloseModal = () => {
    handleRedirect();
    dispatch(closeModal());
  };

  useEscapeKey(handleCloseModal);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      {isModalOpen && (
        <>
          <div
            className={styles.modal_backdrop}
            onClick={handleBackdropClick}
          ></div>
          <div className={styles.modal}>{children}</div>
        </>
      )}
    </>
  );
};

export default Modal;
