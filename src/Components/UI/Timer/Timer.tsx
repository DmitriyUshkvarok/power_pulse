'use client';
import styles from './_timer.module.scss';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import {
  setCaloriesBurned,
  setRemainingTime,
} from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import {
  CountdownCircleTimer,
  useCountdown,
} from 'react-countdown-circle-timer';

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [key, setKey] = useState(0);
  const dispatch = useAppDispatch();
  const { remainingTime } = useCountdown({
    isPlaying: isRunning,
    duration: 180,
    colors: '#e6533c',
  });

  const initialCalorieCount = useAppSelector(
    (state) => state.exercisesDiary.burnedCalories
  );

  const caloriesPerThreeMinutes = initialCalorieCount / 20;

  const handleRemainingTime = useCallback(
    (remainingTime: number) => {
      const timeInMinutes = (180 - remainingTime) / 60;
      const burnedCalories = (timeInMinutes * caloriesPerThreeMinutes) / 3;
      dispatch(setCaloriesBurned(Number(burnedCalories.toFixed(2))));
      dispatch(setRemainingTime(180 - remainingTime));
    },
    [caloriesPerThreeMinutes, dispatch]
  );

  useEffect(() => {
    if (isRunning) {
      handleRemainingTime(remainingTime);
    }
  }, [remainingTime, isRunning, handleRemainingTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
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
        data-testid="timer-circle"
      >
        {({ remainingTime }) => (
          <div>
            <div className={styles.timer_count_text} data-testid="timer-text">
              {Math.floor(remainingTime / 60)}:
              {remainingTime % 60 < 10
                ? `0${remainingTime % 60}`
                : remainingTime % 60}
            </div>
          </div>
        )}
      </CountdownCircleTimer>
      <div className={styles.timer_btn_wrapper}>
        {isRunning ? (
          <button className={styles.timer_btn_pause} onClick={pauseTimer}>
            <Image
              src="/pause.svg"
              alt="icon pause"
              width={32}
              height={32}
              data-testid="icon pause"
            />
          </button>
        ) : (
          <button className={styles.timer_btn_start} onClick={startTimer}>
            <Image src="/play.svg" alt="icon start" width={32} height={32} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
