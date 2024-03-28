'use client';
import { usePathname } from 'next/navigation';
import styles from './_exercises_panel.module.scss';
import Link from 'next/link';

const ExercisesPanel = () => {
  const pathname = usePathname();

  return (
    <div className={styles.exercises_sub_link_box}>
      <h1 className={styles.exercises_title}>Exercises</h1>
      <div className={styles.exercises_sub_link_wrapper}>
        <Link
          href="/exercises/body-parts"
          className={
            pathname === '/exercises/body-parts'
              ? styles.activeLink
              : styles.exercises_sub_link
          }
        >
          Body-parts
        </Link>
        <Link
          className={
            pathname === '/exercises/muscles'
              ? styles.activeLink
              : styles.exercises_sub_link
          }
          href="/exercises/muscles"
        >
          Muscles
        </Link>
        <Link
          className={
            pathname === '/exercises/equipment'
              ? styles.activeLink
              : styles.exercises_sub_link
          }
          href="/exercises/equipment"
        >
          Equipment
        </Link>
      </div>
    </div>
  );
};

export default ExercisesPanel;
