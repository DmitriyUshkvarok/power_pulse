'use client';
import styles from './_add_exercises_modal.module.scss';
import Image from 'next/image';
import Container from '../../Container/Container';
import Modal from '../Modal/Modal';
import useModalClose from '@/src/hooks/useModalClose';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { useSession } from 'next-auth/react';
import { UserSession } from '../../Profile/ProfileForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addExercisesSchema } from '@/src/validation/addExercisesSchema';
import { useState } from 'react';
import { useAppSelector } from '@/src/hooks/redux-hook';
import { createExerciseCards } from '@/src/app/actions/exercisesActions';

interface FormValues {
  name: string;
  burnedCalories: number;
  bodyPart: string;
  target: string;
  equipment: string;
}

const initialValues = {
  name: '',
  burnedCalories: 0,
  bodyPart: '',
  target: '',
  equipment: '',
};

interface PageId {
  id?: string | number;
}

const AddExercisesForm = ({ id }: PageId) => {
  const [loading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = (session?.user as UserSession)?._id;
  const handleCloseModal = useModalClose();

  const exercisesId = id !== undefined ? id : '';

  const isCreatedExercisesModalOpen = useAppSelector(
    modalsSelectors.getIsCreatedExercisesModalOpen
  );

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const exercisesSubListData = {
        name: values.name,
        burnedCalories: values.burnedCalories,
        bodyPart: values.bodyPart,
        target: values.target,
        equipment: values.equipment,
        exercisesId: exercisesId,
      };
      await createExerciseCards(exercisesSubListData, userId);
    } catch (error) {
      console.log('Error in product form submission', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      {isCreatedExercisesModalOpen && (
        <Container>
          <div className={styles.form_container}>
            <Image
              onClick={handleCloseModal}
              className={styles.closed_icon}
              src="/Icon-closed.svg"
              alt="icon closed modal"
              width={11}
              height={11}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={addExercisesSchema}
              onSubmit={handleSubmit}
            >
              <Form className={styles.form_create_product}>
                <div className={styles.form_group}>
                  <Field
                    className={styles.form_input}
                    type="text"
                    name="name"
                    placeholder="name"
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
                  />
                  <ErrorMessage name="equipment">
                    {(msg) => (
                      <div className={styles.validation_error}>
                        <span>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <button className={styles.create_product_btn} type="submit">
                  {loading ? 'Loading...' : 'Create Exercise'}
                </button>
              </Form>
            </Formik>
          </div>
        </Container>
      )}
    </Modal>
  );
};

export default AddExercisesForm;
