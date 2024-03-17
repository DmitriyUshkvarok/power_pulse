'use client';
import styles from './_well_done_diary_modal.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { useRouter } from 'next/navigation';
import { closeWellDoneDiaryModal } from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';

const WellDoneDiaryModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const dynamicCalories = useAppSelector(
    (state) => state.globalLocalSession.dynamicCalories
  );

  const handleCloseModal = () => {
    router.back();
    dispatch(closeWellDoneDiaryModal());
  };

  const handleRedirect = () => {
    dispatch(closeWellDoneDiaryModal());
    // router.push('/diary');
  };

  return (
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
          src="/icon_well_done_diary.svg"
          alt="well done icon diary"
          width={123}
          height={97}
        />
      </div>
      <h2 className={styles.well_done_diary_title}>Well done</h2>
      <div className={styles.well_done_calories}>
        Calories:
        <span className={styles.well_done_calories_span}>
          {dynamicCalories}
        </span>
      </div>
      <button
        onClick={handleCloseModal}
        className={styles.next_product_btn}
        type="button"
      >
        Next product
      </button>
      <Link
        onClick={handleRedirect}
        className={styles.diary_link}
        href="/diary"
      >
        To the Diary
      </Link>
    </div>
  );
};

export default WellDoneDiaryModal;
