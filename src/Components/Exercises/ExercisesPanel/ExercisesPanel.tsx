'use client';
import styles from './_exercises_panel.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/src/hooks/redux-hook';
import { resetCurrentPage } from '@/src/redux/paginationSlice/paginationSlice';

const ExercisesPanel = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleResetCurrentPageFromSessionStorage = () => {
    setTimeout(() => {
      dispatch(resetCurrentPage());
    }, 100);
  };

  const isActive = (path: string) => new RegExp(`^${path}`).test(pathname);

  return (
    <div className={styles.exercises_sub_link_box}>
      <h1 className={styles.exercises_title}>Exercises</h1>
      <div className={styles.exercises_sub_link_wrapper}>
        <Link
          onClick={handleResetCurrentPageFromSessionStorage}
          href="/exercises/body-parts"
          className={
            isActive('/exercises/body-parts')
              ? styles.activeLink
              : styles.exercises_sub_link
          }
        >
          Body-parts
        </Link>
        <Link
          onClick={handleResetCurrentPageFromSessionStorage}
          className={
            isActive('/exercises/muscles')
              ? styles.activeLink
              : styles.exercises_sub_link
          }
          href="/exercises/muscles"
        >
          Muscles
        </Link>
        <Link
          onClick={handleResetCurrentPageFromSessionStorage}
          className={
            isActive('/exercises/equipment')
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
