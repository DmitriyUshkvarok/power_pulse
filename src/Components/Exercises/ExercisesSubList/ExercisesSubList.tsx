'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './_exercises_sub_list.module.scss';
import {
  ExerciseCardData,
  deletedSubExerciseCard,
} from '@/src/app/actions/exercisesActions';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/src/hooks/redux-hook';
import {
  openAddDiaryExercisesModal,
  openModal,
} from '@/src/redux/modalSlice/modalSlice';

interface ExercisesSubListProps {
  id?: string | number;
  exercisesSubListData: ExerciseCardData[];
}

const ExercisesSubList = ({
  id,
  exercisesSubListData,
}: ExercisesSubListProps) => {
  const [loadingSubExerciseCrdId, setLoadingSubExerciseCrdId] = useState<
    string | null
  >(null);

  const dispatch = useAppDispatch();

  const filteredExerciseCards = exercisesSubListData.filter(
    (card) => card.exercisesId === id
  );

  const pathname = usePathname();

  let dynamicPath;

  switch (pathname) {
    case `/exercises/body-parts/${id}`:
      dynamicPath = `/body-parts/${id}`;
      break;
    case `/exercises/muscles/${id}`:
      dynamicPath = `/muscles/${id}`;
      break;
    case `/exercises/equipment/${id}`:
      dynamicPath = `/equipment/${id}`;
      break;
    default:
      dynamicPath = '/';
      break;
  }

  const handleOpenModal = () => {
    dispatch(openModal());
    dispatch(openAddDiaryExercisesModal());
  };

  const handleDeletedExerciseSubCard = async (cardId: string) => {
    try {
      setLoadingSubExerciseCrdId(cardId);
      await deletedSubExerciseCard(cardId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubExerciseCrdId(null);
    }
  };

  if (filteredExerciseCards.length === 0) {
    return (
      <section className={styles.exercise_section}>
        <p className={styles.not_found_sub_exercises_cards}>
          <span className={styles.not_found_span_top}>
            Sorry, no results were found{' '}
          </span>
          Here you can create a list of new daily exercises by clicking on Add
          an exercise cards and fill out a simple form indicating the name of
          the exercise, the number of calories this exercise burns, the name of
          the exercise to which the exercise belongs and the muscle group
          involved in the exercise.
          <span className={styles.not_found_span_bottom}>
            Hurry up and start moving towards your cherished goal!
          </span>
        </p>
      </section>
    );
  }

  return (
    <section className={styles.exercise_section}>
      <ul className={styles.exercise_sub_list}>
        {filteredExerciseCards.map((card) => (
          <li key={card._id} className={styles.exercise_sub_list_item}>
            <div className={styles.exercise_sub_item_header}>
              <div className={styles.exercise_sub_list_pin}>Workout</div>
              <div className={styles.exercise_sub_list_add_btn}>
                <Link onClick={handleOpenModal} href={`/add-diary-exercises`}>
                  Start
                </Link>
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
            {loadingSubExerciseCrdId === card._id ? (
              <p className={styles.deleted_sub_exercise_loader}>Loading...</p>
            ) : (
              <Image
                onClick={() => handleDeletedExerciseSubCard(card._id)}
                className={styles.deleted_product_icon}
                src="/deleted_product.svg"
                alt="deleted exercise card icon"
                width={20}
                height={20}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExercisesSubList;
