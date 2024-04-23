'use client';
import styles from './_well_done_diary_modal.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import useRouterPush from '@/src/hooks/useRouter';
import useModalClose from '@/src/hooks/useModalClose';
import Button from '../../UI/Buttons/ButtonSubmit/Button';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { closeModal } from '@/src/redux/modalSlice/modalSlice';

const WellDoneDiaryModal = () => {
  const dispatch = useAppDispatch();
  const { pushRoute } = useRouterPush();
  const handleCloseModal = useModalClose();

  const dynamicCalories = useAppSelector(sessionSelectors.getdynamicCalories);

  const handleRedirectOnDiary = () => {
    dispatch(closeModal());
    pushRoute('/diary');
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
          src="/icon_well_done_diary.png"
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
      <Button
        onClick={handleCloseModal}
        className={styles.next_product_btn}
        type="button"
      >
        Next product
      </Button>
      <Link
        onClick={handleRedirectOnDiary}
        className={styles.diary_link}
        href="/diary"
      >
        To the Diary
      </Link>
    </div>
  );
};

export default WellDoneDiaryModal;
