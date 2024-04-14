'use client';
import styles from './_exercises_diary_list.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { deleteDiaryProduct } from '@/src/redux/diarySlice/diarySlice';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { formatDateString } from '@/src/utils/formatDate';
import { getDiaryExercisesResponse } from '@/src/app/actions/diaryActions';
interface ExercisesDiaryProps {
  exercisesDiaryData: getDiaryExercisesResponse[];
}

const ExercisesDiaryList = ({ exercisesDiaryData }: ExercisesDiaryProps) => {
  const isTabletDevice = useMediaQuery({ minWidth: '768px' });
  const dispatch = useAppDispatch();

  const selectedDate = useAppSelector(sessionSelectors.getDate);

  const formattedDate = formatDateString(selectedDate);

  const filteredExercisesDiaryData = exercisesDiaryData?.filter(
    (exercisesDiaryData) => {
      return exercisesDiaryData.date === formattedDate;
    }
  );

  useEffect(() => {}, [exercisesDiaryData]);

  const handleDeletedDiaryExercises = async (productId: string) => {
    try {
      dispatch(deleteDiaryProduct(productId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.products_diary_box}>
      <div className={styles.products_diary_box_header}>
        <h3 className={styles.products_diary_box_title}>Exercises</h3>
        <Link className={styles.products_diary_box_link} href="/exercises">
          Add exercise
        </Link>
      </div>
      <ul className={styles.product_diary_list}>
        {!filteredExercisesDiaryData.length && (
          <p className={styles.not_found_products}>Not found products</p>
        )}
        {isTabletDevice && filteredExercisesDiaryData.length > 0 && (
          <ul className={styles.title_list}>
            <li className={`${styles.title_item} ${styles.title_one}`}>
              Body Part
            </li>
            <li className={`${styles.title_item} ${styles.title_two}`}>
              Equipment
            </li>
            <li className={`${styles.title_item} ${styles.title_three}`}>
              Name
            </li>
            <li className={`${styles.title_item} ${styles.title_three}`}>
              Target
            </li>
            <li className={`${styles.title_item} ${styles.title_four}`}>
              Burned Calori
            </li>
            <li className={`${styles.title_item} ${styles.title_four}`}>
              Time
            </li>
          </ul>
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
              <div className={styles.sub_field_group}>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Name</div>
                  <div
                    className={`${styles.field_values} ${styles.third_value}`}
                  >
                    {data.name}
                  </div>
                </div>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Target</div>
                  <div
                    className={`${styles.field_values} ${styles.third_value}`}
                  >
                    {data.target}
                  </div>
                </div>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Burned Calori</div>
                  <div
                    className={`${styles.field_values} ${styles.third_value}`}
                  >
                    {data.burnedCalories}
                  </div>
                </div>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Time</div>
                  <div
                    className={`${styles.field_values} ${styles.third_value}`}
                  >
                    {data.time}
                  </div>
                </div>
                <Image
                  onClick={() => handleDeletedDiaryExercises(data._id)}
                  className={styles.deleted_diary_product_icon}
                  src="/deleted_product.svg"
                  alt="deleted product diart icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExercisesDiaryList;
