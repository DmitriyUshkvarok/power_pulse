'use client';
import styles from './_add_exercises_modal.module.scss';
import Image from 'next/image';
import Container from '../../Container/Container';
import Modal from '../Modal/Modal';
import useAuthRedirect from '@/src/hooks/useRedirect';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { createExerciseCards } from '@/src/app/actions/exercisesActions';
import { useSession } from 'next-auth/react';
import { UserSession } from '../../Profile/ProfileForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addExercisesSchema } from '@/src/formSchemas/addExercisesSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { closeModal } from '@/src/redux/modalSlice/modalSlice';

interface FormValues {
  name: string;
  burnedCalories: number;
  bodyPart: string;
  target: string;
}

const initialValues = {
  name: '',
  burnedCalories: 0,
  bodyPart: '',
  target: '',
};

interface PageId {
  id?: string | number;
}

const AddExercisesForm = ({ id }: PageId) => {
  const [loading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = (session?.user as UserSession)?._id;
  const router = useRouter();
  const { handleRedirect } = useAuthRedirect();
  const dispatch = useAppDispatch();

  const exercisesId = id !== undefined ? id : '';

  const isCreatedExercisesModalOpen = useAppSelector(
    modalsSelectors.getIsCreatedExercisesModalOpen
  );

  const handleSubmit = async (values: FormValues) => {
    try {
      console.log('data', values);
      console.log('user id', userId);
      console.log('exercises id', exercisesId);
      setIsLoading(true);

      const response = await createExerciseCards(values, userId, exercisesId);
      if (response) {
        router.back();
      }
    } catch (error) {
      console.log('Error in product form submission', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    handleRedirect();
    dispatch(closeModal());
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
              {({ values }) => (
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
                  <button className={styles.create_product_btn} type="submit">
                    {loading ? 'Loading...' : 'Create Exercise'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      )}
    </Modal>
  );
};

export default AddExercisesForm;
