'use client';
import styles from './_timer.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { setCaloriesBurned } from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [key, setKey] = useState(0);
  const dispatch = useAppDispatch();

  const initialCalorieCount = useAppSelector(
    (state) => state.exercisesDiary.burnedCalories
  );

  const caloriesPerThreeMinutes = initialCalorieCount / 20;

  const burnedCalorieCount = useAppSelector(
    (state) => state.globalLocalSession.caloriesBurned
  );

  console.log(burnedCalorieCount);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const handleRemainingTime = (remainingTime: number) => {
    const timeInMinutes = (180 - remainingTime) / 60;
    const burnedCalories = (timeInMinutes * caloriesPerThreeMinutes) / 3;
    dispatch(setCaloriesBurned(Number(burnedCalories.toFixed(2))));
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <CountdownCircleTimer
        key={key}
        isPlaying={isRunning}
        duration={180}
        colors="#e6533c"
        strokeWidth={8}
        trailColor="rgba(239, 237, 232, 0.1)"
        strokeLinecap="square"
        onComplete={handleTimerComplete}
      >
        {({ remainingTime }) => {
          handleRemainingTime(remainingTime);
          return (
            <div>
              <div className={styles.timer_count_text}>
                {Math.floor(remainingTime / 60)}:
                {remainingTime % 60 < 10
                  ? `0${remainingTime % 60}`
                  : remainingTime % 60}
              </div>
            </div>
          );
        }}
      </CountdownCircleTimer>
      <div className={styles.timer_btn_wrapper}>
        {isRunning ? (
          <button className={styles.timer_btn_pause} onClick={pauseTimer}>
            <Image src="/pause.svg" alt="icon pause" width={32} height={32} />
          </button>
        ) : (
          <button className={styles.timer_btn_start} onClick={startTimer}>
            <Image src="/play.svg" alt="icon start" width={32} height={32} />
          </button>
        )}
      </div>
      <div style={{ color: 'white' }}>{burnedCalorieCount}</div>
    </div>
  );
};

export default Timer;
