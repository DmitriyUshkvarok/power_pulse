'use client';
import styles from './_add_diary_exercises_modal.module.scss';
import Modal from '../Modal/Modal';
import Container from '../../Container/Container';
import Image from 'next/image';
import useAuthRedirect from '@/src/hooks/useRedirect';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { closeModal } from '@/src/redux/modalSlice/modalSlice';
import { useState } from 'react';
import { addDiaryExercisesSchema } from '@/src/formSchemas/addDiaryExercisesSchema';

interface FormValues {
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  burnedCalories: number;
  time: string;
}

const AddDiaryExercisesModal = () => {
  const [loading, setIsLoading] = useState(false);
  const { handleRedirect } = useAuthRedirect();
  const dispatch = useAppDispatch();
  const isAddDiaryExercisesModalOpen = useAppSelector(
    modalsSelectors.getIsAddDiaryExercisesModalOpen
  );

  const exerciseDiaryValue = useAppSelector((state) => state.exercisesDiary);
  const initialValues = {
    name: exerciseDiaryValue.name || '',
    target: exerciseDiaryValue.target || '',
    bodyPart: exerciseDiaryValue.bodyPart || '',
    equipment: exerciseDiaryValue.equipment || '',
    burnedCalories: exerciseDiaryValue.burnedCalories || 0,
    time: '',
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
            <Formik
              initialValues={initialValues}
              validationSchema={addDiaryExercisesSchema}
              onSubmit={handleSubmit}
            >
              <Form className={styles.form_create_exercise_diary}>
                <div className={styles.form_group}>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="name"
                    placeholder="name"
                    readOnly
                  />
                  <ErrorMessage name="name">
                    {(msg) => (
                      <div className={styles.validation_error}>
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className={styles.form_group}>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="burnedCalories"
                    placeholder="burned calories"
                    readOnly
                  />
                  <ErrorMessage name="burnedCalories">
                    {(msg) => (
                      <div className={styles.validation_error}>
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className={styles.form_group}>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="bodyPart"
                    placeholder="body part"
                    readOnly
                  />
                  <ErrorMessage name="bodyPart">
                    {(msg) => (
                      <div className={styles.validation_error}>
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className={styles.form_group}>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="target"
                    placeholder="target"
                    readOnly
                  />
                  <ErrorMessage name="target">
                    {(msg) => (
                      <div className={styles.validation_error}>
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className={styles.form_group}>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="equipment"
                    placeholder="equipment"
                    readOnly
                  />
                  <ErrorMessage name="equipment">
                    {(msg) => (
                      <div className={styles.validation_error}>
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
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
