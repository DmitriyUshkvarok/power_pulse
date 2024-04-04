'use client';
import styles from './_button_back.module.scss';
import { useRouter } from 'next/navigation';

const ButtonBack = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button type="button" onClick={handleBack} className={styles.btnBack}>
      Back
    </button>
  );
};

export default ButtonBack;
