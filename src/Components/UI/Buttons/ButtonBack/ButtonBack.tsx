'use client';
import styles from './_button_back.module.scss';
import { useRouterBackForDynamicPageExercises } from '@/src/hooks/useRouterBackForDynmicPageExercises';
import { useRouter } from 'next/navigation';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { useAppSelector } from '@/src/hooks/redux-hook';

const ButtonBack = () => {
  const router = useRouter();
  const id = useAppSelector(sessionSelectors.getDynamicExercisesPageId);
  const dynamicPath = useRouterBackForDynamicPageExercises(id);

  const handleBack = () => {
    router.push(dynamicPath);
  };

  return (
    <button type="button" onClick={handleBack} className={styles.btnBack}>
      Back
    </button>
  );
};

export default ButtonBack;
