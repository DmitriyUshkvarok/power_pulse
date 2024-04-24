'use client';
import styles from './_modal.module.scss';
import useModalClose from '@/src/hooks/useModalClose';
import { useEscapeKey } from '@/src/hooks/useEscapeKey';
import { useAppSelector } from '@/src/hooks/redux-hook';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { RootLayoutProps } from './types';

const Modal = ({ children }: RootLayoutProps) => {
  const handleCloseModal = useModalClose();

  const isModalOpen = useAppSelector(modalsSelectors.getIsModalOpen);

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
