'use client';
import styles from './_day_dashsboard.module.scss';
import Image from 'next/image';
import useCalculateDailyRecommendation from '@/src/hooks/useCalculateDailyCalories';
import useRemainingCalories from '@/src/hooks/useRemainingCalories';

const DayDashboard = () => {
  const { calculateCalories } = useCalculateDailyRecommendation();

  const { consumedCalories, remainingCalories } = useRemainingCalories();

  const borderClass =
    remainingCalories >= 0 ? styles.greenBorder : styles.redBorder;

  return (
    <div>
      <ul className={styles.dashboard_list}>
        <li className={styles.dashboard_item}>
          <div className={styles.dashboard_sub_item}>
            <div className={styles.dashboard_header}>
              <Image
                className={styles.dashboard_icon}
                src="/icon-daily.svg"
                alt="dashboard icon"
                width={20}
                height={20}
              />
              <div className={styles.dashboard_info}>Daily calorie intake</div>
            </div>
            <div className={styles.dashboard_value}>
              {calculateCalories.recommendedCalories
                ? calculateCalories.recommendedCalories.toFixed()
                : 0}
            </div>
          </div>
          <div className={styles.dashboard_sub_item}>
            <div className={styles.dashboard_header}>
              <Image
                className={styles.dashboard_icon}
                src="/icon-apple.svg"
                alt="dashboard icon"
                width={20}
                height={20}
              />
              <div className={styles.dashboard_info}>Сalories consumed</div>
            </div>
            <div className={styles.dashboard_value}>
              {consumedCalories.toFixed()}
            </div>
          </div>
          <div className={`${styles.dashboard_sub_item} ${borderClass}`}>
            <div className={styles.dashboard_header}>
              <Image
                className={styles.dashboard_icon}
                src="/icon-calories.svg"
                alt="dashboard icon"
                width={20}
                height={20}
              />
              <div className={styles.dashboard_info}>
                The rest of the calories
              </div>
            </div>
            <div className={styles.dashboard_value}>
              {remainingCalories.toFixed()}
            </div>
          </div>
        </li>
        <li className={styles.dashboard_item}>
          <div className={styles.dashboard_sub_item}>
            <div className={styles.dashboard_header}>
              <Image
                className={styles.dashboard_icon}
                src="/icon-sport.svg"
                alt="dashboard icon"
                width={20}
                height={20}
              />
              <div className={styles.dashboard_info}>Daily norm of sports</div>
            </div>
            <div className={styles.dashboard_value}>
              {calculateCalories.recommendedSportTime} min
            </div>
          </div>
          <div className={styles.dashboard_sub_item}>
            <div className={styles.dashboard_header}>
              <Image
                className={styles.dashboard_icon}
                src="/icon-fire.svg"
                alt="dashboard icon"
                width={20}
                height={20}
              />
              <div className={styles.dashboard_info}>Сalories burned</div>
            </div>
            <div className={styles.dashboard_value}>855</div>
          </div>
          <div className={styles.dashboard_sub_item}>
            <div className={styles.dashboard_header}>
              <Image
                className={styles.dashboard_icon}
                src="/icon-sport-man.svg"
                alt="dashboard icon"
                width={20}
                height={20}
              />
              <div className={styles.dashboard_info}>The rest of sports</div>
            </div>
            <div className={styles.dashboard_value}>85 min</div>
          </div>
        </li>
      </ul>
      <div className={styles.reminder_wrapper}>
        <Image
          className={styles.icon_reminder}
          src="/icons-warning.svg"
          alt="icon reminder"
          width={24}
          height={24}
        />
        <p className={styles.reminder}>
          Record all your meals in a calorie diary every day. This will help me
          be aware of my nutrition and make me responsible for my choices.
        </p>
      </div>
    </div>
  );
};

export default DayDashboard;
