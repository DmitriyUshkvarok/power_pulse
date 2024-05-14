'use client';
import styles from './_exercises_list.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../../Container/Container';
import useFilteredExercises from '@/src/hooks/useFilteredExercises';
import useTabletItemsPerPage from '@/src/hooks/useTabletItemsPerPage';
import { useDynamicPath } from '@/src/hooks/useDynamicPath';
import { useAppSelector } from '@/src/hooks/redux-hook';

const ExercisesList = () => {
  const dynamicPath = useDynamicPath();
  const exercisesToShow = useFilteredExercises();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);

  const itemsPerPage = useTabletItemsPerPage();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedExercises = exercisesToShow.slice(startIndex, endIndex);

  return (
    <Container>
      <ul className={styles.exercise_card_list}>
        {displayedExercises.map((exercise) => (
          <li className={styles.exercise_card_item} key={exercise._id}>
            <Link href={`/exercises${dynamicPath}${exercise._id}`}>
              <div className={styles.exercise_card_item_overlay}></div>
              <div className={styles.exercise_card_info_wrapper}>
                <h2 className={styles.exercise_card_title}>{exercise.title}</h2>
                <div className={styles.exercise_card_category}>
                  {exercise.category}
                </div>
              </div>
              <Image
                className={styles.exercise_card_img}
                src={exercise.imageURL}
                alt={exercise.title}
                fill
                priority
                sizes="50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ExercisesList;
