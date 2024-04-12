'use client';
import styles from './_well_done_diary_exercises_modal.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '../Modal/Modal';
import Container from '../../Container/Container';
import useAuthRedirect from '@/src/hooks/useRedirect';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { closeModal } from '@/src/redux/modalSlice/modalSlice';
import { useRouter } from 'next/navigation';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { convertSeconds } from '@/src/utils/convertSeconds';

const WellDoneDiaryExercisesModal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { handleRedirect } = useAuthRedirect();

  const isAddDiaryExercisesModalOpen = useAppSelector(
    modalsSelectors.getIsWellDoneExercisesDiaryModal
  );

  const burnedCalories = useAppSelector(sessionSelectors.getCaloriesBurned);
  const remainingTime = useAppSelector(sessionSelectors.getRemainingTime);

  const handleCloseModal = () => {
    dispatch(closeModal());
    handleRedirect();
  };

  const handleRedirectOnDiary = () => {
    dispatch(closeModal());
    router.push('/diary');
  };

  return (
    <Modal>
      {isAddDiaryExercisesModalOpen && (
        <Container>
          <div className={styles.well_done_modal_container}>
            <Image
              onClick={handleCloseModal}
              className={styles.closed_icon}
              src="/Icon-closed.svg"
              alt="icon closed modal"
              width={11}
              height={11}
            />
            <div className={styles.icon_wrapper}>
              <Image
                src="/well-done-icon.svg"
                alt="well done icon diary exercises"
                width={123}
                height={97}
              />
            </div>
            <h2 className={styles.well_done_diary_title}>Well done</h2>
            <div className={styles.well_done_time}>
              Your time:
              <span className={styles.well_done_calories_span}>
                {convertSeconds(remainingTime)} minutes
              </span>
            </div>
            <div className={styles.well_done_calories}>
              Burned calories:
              <span className={styles.well_done_calories_span}>
                {burnedCalories}
              </span>
            </div>
            <button
              onClick={handleCloseModal}
              className={styles.next_product_btn}
              type="button"
            >
              Next exercise
            </button>
            <Link
              onClick={handleRedirectOnDiary}
              className={styles.diary_link}
              href="/diary"
            >
              To the Diary
            </Link>
          </div>
        </Container>
      )}
    </Modal>
  );
};

export default WellDoneDiaryExercisesModal;
