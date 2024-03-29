'use client';
import styles from './_exercises_list.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import useFilteredExercises from '@/src/hooks/useFilteredExercises';
import { useDynamicPath } from '@/src/hooks/useDynamicPath';

const ExercisesList = () => {
  const dynamicPath = useDynamicPath();
  const exercisesToShow = useFilteredExercises();

  return (
    <ul className={styles.exercise_card_list}>
      {exercisesToShow.map((exercise) => (
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
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ExercisesList;
