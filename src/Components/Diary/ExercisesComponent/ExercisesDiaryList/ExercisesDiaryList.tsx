'use client';
import styles from './_exercises_diary_list.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/hooks/redux-hook';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { formatDateString } from '@/src/utils/formatDate';
import { convertSeconds } from '@/src/utils/convertSeconds';
import { deletedDiaryExercises } from '@/src/app/actions/diaryActions';
import { setExercisesDiaryData } from '@/src/redux/addDiaryExercisesSlice/addDiaryExercisesSlice';
import { ExercisesDiaryProps } from './types';

const ExercisesDiaryList = ({ exercisesDiaryData }: ExercisesDiaryProps) => {
  const isTabletDevice = useMediaQuery({ minWidth: '768px' });
  const [loading, setLoading] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector(sessionSelectors.getDate);
  const formattedDate = formatDateString(selectedDate);

  const filteredExercisesDiaryData = exercisesDiaryData?.filter(
    (exercisesDiaryData) => {
      return exercisesDiaryData.date === formattedDate;
    }
  );

  useEffect(() => {
    dispatch(setExercisesDiaryData(exercisesDiaryData));
  }, [dispatch, exercisesDiaryData]);

  const handleDeletedDiaryExercises = async (cardId: string) => {
    try {
      setLoading(cardId);

      await deletedDiaryExercises(cardId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  };
  return (
    <div className={styles.products_diary_box}>
      <div className={styles.products_diary_box_header}>
        <h2 className={styles.products_diary_box_title}>Exercises</h2>
        <Link
          className={styles.products_diary_box_link}
          href="/exercises/body-parts"
        >
          Add exercise
        </Link>
      </div>
      <ul className={styles.product_diary_list}>
        {!filteredExercisesDiaryData.length && (
          <li className={styles.not_found_products}>Not found products</li>
        )}
        {isTabletDevice && filteredExercisesDiaryData.length > 0 && (
          <li className={styles.title_list}>
            <div className={`${styles.title_item} ${styles.title_one}`}>
              Body Part
            </div>
            <div className={`${styles.title_item} ${styles.title_two}`}>
              Equipment
            </div>
            <div className={`${styles.title_item} ${styles.title_three}`}>
              Name
            </div>
            <div className={`${styles.title_item} ${styles.title_four}`}>
              Target
            </div>
            <div className={`${styles.title_item} ${styles.title_five}`}>
              Burned Calori
            </div>
            <div className={`${styles.title_item} ${styles.title_six}`}>
              Time
            </div>
          </li>
        )}
        {filteredExercisesDiaryData?.map((data) => (
          <li className={styles.product_diary_item} key={data._id}>
            <div className={styles.field_group}>
              <div className={styles.field_title}>Body Part</div>
              <div className={`${styles.field_values} ${styles.first_value}`}>
                {data.bodyPart}
              </div>
            </div>
            <div className={styles.field_group}>
              <div className={styles.field_title}>Equipment</div>
              <div className={`${styles.field_values} ${styles.second_value}`}>
                {data.equipment}
              </div>
            </div>
            <div className={styles.field_group}>
              <div className={styles.field_title}>Name</div>
              <div className={`${styles.field_values} ${styles.third_value}`}>
                {data.name}
              </div>
            </div>
            <div className={styles.field_group}>
              <div className={styles.sub_field_group}>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Target</div>
                  <div
                    className={`${styles.field_values} ${styles.fourth_value}`}
                  >
                    {data.target}
                  </div>
                </div>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Burned Calori</div>
                  <div
                    className={`${styles.field_values} ${styles.five_value}`}
                  >
                    {data.burnedCalories}
                  </div>
                </div>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Time</div>
                  <div className={`${styles.field_values} ${styles.six_value}`}>
                    {convertSeconds(data.time)}
                  </div>
                </div>
                <div
                  className={`${styles.sub_field_group_box} ${styles.delete}`}
                >
                  {loading === data._id ? (
                    <p className={styles.deleted_exercise_diary_loader}>
                      Loading...
                    </p>
                  ) : (
                    <Image
                      onClick={() => handleDeletedDiaryExercises(data._id)}
                      className={styles.deleted_diary_product_icon}
                      src="/deleted_product.svg"
                      alt="deleted product diart icon"
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExercisesDiaryList;
