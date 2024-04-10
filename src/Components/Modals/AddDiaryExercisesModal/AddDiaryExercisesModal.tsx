'use client';
import styles from './_add_diary_exercises_modal.module.scss';
import Modal from '../Modal/Modal';
import Container from '../../Container/Container';
import Image from 'next/image';
import useAuthRedirect from '@/src/hooks/useRedirect';
import Timer from '../../UI/Timer/Timer';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { Formik, Form, Field } from 'formik';
import { closeModal } from '@/src/redux/modalSlice/modalSlice';
import { useState } from 'react';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { convertSeconds } from '@/src/utils/convertSeconds';

interface FormValues {
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
}

const AddDiaryExercisesModal = () => {
  const [loading, setIsLoading] = useState(false);
  const { handleRedirect } = useAuthRedirect();
  const dispatch = useAppDispatch();

  const isAddDiaryExercisesModalOpen = useAppSelector(
    modalsSelectors.getIsAddDiaryExercisesModalOpen
  );
  const burnedCalorieCount = useAppSelector(sessionSelectors.getCaloriesBurned);
  const remainingTime = useAppSelector(sessionSelectors.getRemainingTime);
  const exerciseDiaryValue = useAppSelector((state) => state.exercisesDiary);

  const initialValues = {
    name: exerciseDiaryValue.name || '',
    target: exerciseDiaryValue.target || '',
    bodyPart: exerciseDiaryValue.bodyPart || '',
    equipment: exerciseDiaryValue.equipment || '',
  };

  const handleCloseModal = () => {
    handleRedirect();
    dispatch(closeModal());
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.log('Error in product form submission', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal>
      <Container>
        {isAddDiaryExercisesModalOpen && (
          <div className={styles.form_container}>
            <Image
              onClick={handleCloseModal}
              className={styles.closed_icon}
              src="/Icon-closed.svg"
              alt="icon closed modal"
              width={11}
              height={11}
            />
            <div className={styles.modal_img_wrapper}>
              <Image
                className={styles.modal_img}
                src="/exercise-modal-img.jpg"
                alt="exercise-modal-img"
                fill
              />
            </div>
            <div className={styles.timer_wrapper}>
              <div className={styles.time_title}>Time</div>
              <Timer />
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className={styles.form_create_exercise_diary}>
                <div className={styles.form_calories}>
                  Burned calories:
                  <span className={styles.form_calories_span}>
                    {burnedCalorieCount}
                  </span>
                </div>
                <div className={styles.form_group}>
                  <span className={styles.form_group_span}>Name</span>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="name"
                    readOnly
                  />
                </div>
                <div className={styles.form_group}>
                  <span className={styles.form_group_span}>Target</span>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="target"
                    readOnly
                  />
                </div>
                <div className={styles.form_group}>
                  <span className={styles.form_group_span}>Body part</span>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="bodyPart"
                    readOnly
                  />
                </div>
                <div className={styles.form_group}>
                  <span className={styles.form_group_span}>Equipment</span>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="equipment"
                    readOnly
                  />
                </div>
                <div className={styles.form_group}>
                  <span className={styles.form_group_span}>Time</span>
                  <div className={styles.form_input}>
                    {remainingTime
                      ? convertSeconds(remainingTime) + '  minutes'
                      : '3 minutes'}
                  </div>
                </div>
                <button
                  className={styles.create_exercises_diary_btn}
                  type="submit"
                >
                  {loading ? 'Loading...' : 'Add to diary'}
                </button>
              </Form>
            </Formik>
          </div>
        )}
      </Container>
    </Modal>
  );
};

export default AddDiaryExercisesModal;
