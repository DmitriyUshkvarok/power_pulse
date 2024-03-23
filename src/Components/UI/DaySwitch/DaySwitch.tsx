'use client';
import styles from './_day_switch.module.scss';
import Image from 'next/image';
import { formatDate } from '@/src/utils/formatDate';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { setDate } from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';

const DaySwitch = () => {
  const dispatch = useAppDispatch();
  const dateString = useAppSelector((state) => state.globalLocalSession.date);
  const date = new Date(dateString);

  const handlePrevDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    const newDateString = newDate.toISOString();
    dispatch(setDate(newDateString));
  };

  const handleNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    const newDateString = newDate.toISOString();
    dispatch(setDate(newDateString));
  };

  return (
    <div>
      <div className={styles.day_switch_wrapper}>
        <div className={styles.date_text}>{formatDate(date)}</div>
        <Image
          className={styles.calendar_icon}
          src="/calendar-orange.svg"
          alt="icon calendar"
          width={24}
          height={24}
        />
        <button className={styles.prev_date} onClick={handlePrevDay}>
          {'<'}
        </button>
        <button className={styles.next_date} onClick={handleNextDay}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default DaySwitch;
