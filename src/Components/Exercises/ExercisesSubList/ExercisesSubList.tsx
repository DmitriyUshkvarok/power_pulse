'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './_exercises_sub_list.module.scss';
import { ExerciseCardData } from '@/src/app/actions/exercisesActions';

interface ExercisesSubListProps {
  id?: string | number;
  exercisesSubListData: ExerciseCardData[];
}

const ExercisesSubList = ({
  id,
  exercisesSubListData,
}: ExercisesSubListProps) => {
  const filteredExerciseCards = exercisesSubListData.filter(
    (card) => card.exercisesId === id
  );

  return (
    <section className={styles.exercise_section}>
      <ul className={styles.exercise_sub_list}>
        {filteredExerciseCards.map((card) => (
          <li key={card._id} className={styles.exercise_sub_list_item}>
            <div className={styles.exercise_sub_item_header}>
              <div className={styles.exercise_sub_list}>Workout</div>
              <div className={styles.exercise_sub_list_add_btn}>
                <Link href="/add-diary">Start</Link>
              </div>
            </div>
            <div className={styles.exercise_sub_list_middle}>{card.name}</div>
            <div className={styles.exercise_sub_list_item_footer}>
              <div className={styles.exercise_sub_list_item_calories}>
                Burned Calories:
                <span className={styles.exercise_sub_list_item_span}>
                  {card.burnedCalories}
                </span>
              </div>
              <div className={styles.exercise_sub_list_item_body_part}>
                Body Part:
                <span className={styles.exercise_sub_list_item_span}>
                  {card.bodyPart}
                </span>
              </div>
              <div className={styles.exercise_sub_list_item_target}>
                Target:
                <span className={styles.exercise_sub_list_item_span}>
                  {card.target}
                </span>
              </div>
            </div>
            <Image
              className={styles.deleted_product_icon}
              src="/deleted_product.svg"
              alt="deleted exercise card icon"
              width={20}
              height={20}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExercisesSubList;
