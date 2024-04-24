'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './_exercises_sub_list.module.scss';
import { deletedSubExerciseCard } from '@/src/app/actions/exercisesActions';
import { ExerciseCardData } from '@/src/app/actions/types/exercisesActionsTypes';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/src/hooks/redux-hook';
import {
  openAddDiaryExercisesModal,
  openModal,
} from '@/src/redux/modalSlice/modalSlice';
import { setDynamicExercisesPageId } from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';
import { useDynamicPath } from '@/src/hooks/useDynamicPath';
import { setSelectExercisesDiary } from '@/src/redux/addDiaryExercisesSlice/addDiaryExercisesSlice';
import { ExercisesSubListProps } from './types';

const ExercisesSubList = ({
  id,
  exercisesSubListData,
}: ExercisesSubListProps) => {
  const [loadingSubExerciseCrdId, setLoadingSubExerciseCrdId] = useState<
    string | null
  >(null);
  const dispatch = useAppDispatch();
  const dynamicPath = useDynamicPath(id);

  useEffect(() => {
    if (id) {
      dispatch(setDynamicExercisesPageId(id));
    }
  }, [dispatch, id]);

  const filteredExerciseCards = exercisesSubListData.filter(
    (card) => card.exercisesId === id
  );

  const handleOpenModal = (card: ExerciseCardData) => {
    dispatch(openModal());
    dispatch(openAddDiaryExercisesModal());
    dispatch(setSelectExercisesDiary(card));
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
          Here you can create a list of new daily exercises by clicking Add
          Exercise Card and filling out a simple form with the name of the
          exercise, the number of calories it burns, the body part to be used
          during the exercise, the equipment to be used for the exercise, and
          the muscle group involved in the exercise.
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
                <Link
                  onClick={() => handleOpenModal(card)}
                  href={`/exercises${dynamicPath}/add-diary-exercises`}
                  scroll={false}
                >
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
              <div className={styles.exercise_sub_list_item_equipment}>
                Equipment:
                <span className={styles.exercise_sub_list_item_span}>
                  {card.equipment}
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
