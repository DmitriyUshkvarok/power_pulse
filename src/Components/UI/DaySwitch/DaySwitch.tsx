'use client';
import styles from './_day_switch.module.scss';
import Image from 'next/image';
import { formatDate } from '@/src/utils/formatDate';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { setDate } from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';
import { UserSession } from '../../DataUsers/DataUserStepThree';
import { useSession } from 'next-auth/react';

const DaySwitch = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const dateString = useAppSelector((state) => state.globalLocalSession.date);
  const date = new Date(dateString);
  const createdAt = (session?.user as UserSession)?.createdAt;

  const canGoForward = formatDate(date) !== formatDate(new Date());
  const canGoBack = createdAt ? new Date(createdAt) < date : true;

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
        <button
          className={`${styles.prev_date} ${!canGoBack ? styles.disabled : ''}`}
          onClick={handlePrevDay}
          disabled={!canGoBack}
        >
          <Image
            src={canGoBack ? '/prev-day.svg' : '/prev-day-gray.svg'}
            alt="prev day icon"
            width={16}
            height={16}
          />
        </button>
        <button
          className={`${styles.next_date} ${!canGoForward && styles.disabled}`}
          onClick={handleNextDay}
          disabled={!canGoForward}
        >
          <Image
            src={canGoForward ? '/next-day.svg' : '/next-day-gray.svg'}
            alt="next day icon"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
};

export default DaySwitch;
