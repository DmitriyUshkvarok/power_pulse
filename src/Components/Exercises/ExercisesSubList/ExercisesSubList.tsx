'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './_exercises_sub_list.module.scss';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { useSession } from 'next-auth/react';
import { UserSession } from '../../Profile/ProfileForm';
import { fetchExerciseCards } from '@/src/redux/exercisesSubListSlice/exercisesSubListSlice';

interface PageId {
  id?: string | number;
}

const ExercisesSubList = ({ id }: PageId) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const userId = (session?.user as UserSession)?._id;

  const exercisesSubListData = useAppSelector(
    (state) => state.exercisesSubList.exerciseCards
  );

  useEffect(() => {
    dispatch(fetchExerciseCards(userId));
  }, [dispatch, userId]);

  const filteredExerciseCards = exercisesSubListData.filter(
    (card) => card.exercisesId === id
  );

  return (
    <section className={styles.product_section}>
      <ul className={styles.product_list}>
        {filteredExerciseCards.map((card) => (
          <li key={card._id} className={styles.product_list_item}>
            <div className={styles.product_list_item_header}>
              <div className={styles.product_list_pin}>Exercise</div>
              <Link href="/add-diary">
                <div className={styles.product_list_add_btn}>Add</div>
              </Link>
            </div>
            <div className={styles.product_list_item_middle}>{card.name}</div>
            <div className={styles.product_list_item_footer}>
              <div className={styles.product_list_item_calories}>
                Burned Calories:
                <span className={styles.product_list_item_span}>
                  {card.burnedCalories}
                </span>
              </div>
              <div className={styles.product_list_item_category}>
                Body Part:
                <span className={styles.product_list_item_span}>
                  {card.bodyPart}
                </span>
              </div>
              <div className={styles.product_list_item_weight}>
                Target:
                <span className={styles.product_list_item_span}>
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
