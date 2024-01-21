'use client';
import styles from './_modal.module.scss';
import { useRouter } from 'next/navigation';
import { useEscapeKey } from '@/src/hooks/useEscapeKey';

interface RootLayoutProps {
  children: React.ReactNode;
}

const Modal = ({ children }: RootLayoutProps) => {
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  useEscapeKey(handleCloseModal);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      router.back();
    }
  };

  return (
    <div className={styles.modal_backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export default Modal;
