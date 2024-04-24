'use client';
import styles from './_add_exercises_modal.module.scss';
import Image from 'next/image';
import Container from '../../Container/Container';
import Modal from '../Modal/Modal';
import useModalClose from '@/src/hooks/useModalClose';
import DynamicForm from '../../UI/DynamicForm/DynamicForm';
import Button from '../../UI/Buttons/ButtonSubmit/Button';
import InputField from '../../UI/InputField/InputField';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { addExercisesSchema } from '@/src/validation/addExercisesSchema';
import { useState } from 'react';
import { useAppSelector } from '@/src/hooks/redux-hook';
import { createExerciseCards } from '@/src/app/actions/exercisesActions';
import { FormValues, PageId } from './types';
import useUserSession from '@/src/hooks/useUserSession';

const initialValues = {
  name: '',
  burnedCalories: 0,
  bodyPart: '',
  target: '',
  equipment: '',
  video: '',
};

const AddExercisesForm = ({ id }: PageId) => {
  const [loading, setIsLoading] = useState(false);
  const { userId } = useUserSession();
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
        video: values.video,
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
            <DynamicForm
              initialValues={initialValues}
              validationSchema={addExercisesSchema}
              onSubmit={handleSubmit}
            >
              <div className={styles.form_create_product}>
                <div className={styles.form_group}>
                  <InputField
                    errorClassName={styles.validation_error}
                    className={styles.form_input_exercises}
                    type="text"
                    name="name"
                    placeholder="name"
                  />
                </div>
                <div className={styles.form_group}>
                  <InputField
                    errorClassName={styles.validation_error}
                    className={styles.form_input_exercises}
                    type="text"
                    name="burnedCalories"
                    placeholder="burned calories"
                  />
                </div>
                <div className={styles.form_group}>
                  <InputField
                    errorClassName={styles.validation_error}
                    className={styles.form_input_exercises}
                    type="text"
                    name="bodyPart"
                    placeholder="body part"
                  />
                </div>
                <div className={styles.form_group}>
                  <InputField
                    errorClassName={styles.validation_error}
                    className={styles.form_input_exercises}
                    type="text"
                    name="target"
                    placeholder="target"
                  />
                </div>
                <div className={styles.form_group}>
                  <InputField
                    errorClassName={styles.validation_error}
                    className={styles.form_input_exercises}
                    type="text"
                    name="equipment"
                    placeholder="equipment"
                  />
                </div>
                <div className={styles.form_group}>
                  <InputField
                    errorClassName={styles.validation_error}
                    className={styles.form_input_exercises}
                    type="text"
                    name="video"
                    placeholder="video link"
                  />
                </div>
                <Button
                  className={styles.create_product_btn}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Create Exercise'}
                </Button>
              </div>
            </DynamicForm>
          </div>
        </Container>
      )}
    </Modal>
  );
};

export default AddExercisesForm;
