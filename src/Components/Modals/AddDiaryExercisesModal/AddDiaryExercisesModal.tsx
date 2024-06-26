'use client';
import styles from './_add_diary_exercises_modal.module.scss';
import Modal from '../Modal/Modal';
import Container from '../../Container/Container';
import Image from 'next/image';
import VideoPlayer from '../../UI/VideoPlayer/VideoPlayer';
import WellDoneDiaryExercisesModal from '../WellDoneDiaryExercisesModal/WellDoneDiaryExercisesModal';
import Timer from '../../UI/Timer/Timer';
import useRouterPush from '@/src/hooks/useRouter';
import useModalClose from '@/src/hooks/useModalClose';
import DynamicForm from '../../UI/DynamicForm/DynamicForm';
import Button from '../../UI/Buttons/ButtonSubmit/Button';
import InputField from '../../UI/InputField/InputField';
import useUserSession from '@/src/hooks/useUserSession';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { useState } from 'react';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { convertSeconds } from '@/src/utils/convertSeconds';
import { createDiaryExercises } from '@/src/app/actions/diaryActions';
import { useDynamicPath } from '@/src/hooks/useDynamicPath';
import { openWellDoneExercisesDiaryModal } from '@/src/redux/modalSlice/modalSlice';
import { formatDate } from '@/src/utils/formatDate';
import { FormValues } from './types';

const AddDiaryExercisesModal = () => {
  const [loading, setIsLoading] = useState(false);
  const { pushRoute } = useRouterPush();
  const dispatch = useAppDispatch();
  const { userId } = useUserSession();
  const handleCloseModal = useModalClose();

  const isAddDiaryExercisesModalOpen = useAppSelector(
    modalsSelectors.getIsAddDiaryExercisesModalOpen
  );
  const isWellDoneDiaryExercisesModalOpen = useAppSelector(
    modalsSelectors.getIsWellDoneExercisesDiaryModal
  );
  const burnedCalorieCount = useAppSelector(sessionSelectors.getCaloriesBurned);
  const remainingTime = useAppSelector(sessionSelectors.getRemainingTime);
  const id = useAppSelector(sessionSelectors.getDynamicExercisesPageId);
  const exerciseDiaryValue = useAppSelector((state) => state.exercisesDiary);

  const dynamicPath = useDynamicPath(id);

  const initialValues = {
    name: exerciseDiaryValue.name || '',
    target: exerciseDiaryValue.target || '',
    bodyPart: exerciseDiaryValue.bodyPart || '',
    equipment: exerciseDiaryValue.equipment || '',
  };

  const handleSubmit = async (values: FormValues) => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    try {
      setIsLoading(true);
      const data = {
        name: values.name,
        target: values.target,
        bodyPart: values.bodyPart,
        equipment: values.equipment,
        burnedCalories: burnedCalorieCount,
        time: remainingTime,
        date: formattedDate,
      };

      const response = await createDiaryExercises(data, userId);

      if (response) {
        pushRoute(
          `/exercises${dynamicPath}/add-diary-exercises?well-done-exercises`
        );
        dispatch(openWellDoneExercisesDiaryModal());
      }
    } catch (error) {
      console.log('Error in product form submission', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isAddDiaryExercisesModalOpen && (
        <Modal>
          <Container>
            {isWellDoneDiaryExercisesModalOpen ? (
              <WellDoneDiaryExercisesModal />
            ) : (
              <div className={styles.form_container}>
                <div className={styles.video_player_wrapper}></div>
                <Image
                  onClick={handleCloseModal}
                  className={styles.closed_icon}
                  src="/Icon-closed.svg"
                  alt="icon closed modal"
                  width={11}
                  height={11}
                />
                <div className={styles.modal_img_wrapper}>
                  {exerciseDiaryValue.video ? (
                    <VideoPlayer />
                  ) : (
                    <Image
                      className={styles.modal_img}
                      src="/exercise-modal-img.jpg"
                      alt="exercise-modal-img"
                      width={270}
                      height={226}
                    />
                  )}
                </div>
                <div className={styles.timer_wrapper}>
                  <div className={styles.time_title}>Time</div>
                  <Timer />
                </div>
                <DynamicForm
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                >
                  <div className={styles.form_create_exercise_diary}>
                    <div className={styles.form_calories}>
                      Burned calories:
                      <span className={styles.form_calories_span}>
                        {burnedCalorieCount}
                      </span>
                    </div>
                    <div className={styles.form_group}>
                      <span className={styles.form_group_span}>Name</span>
                      <InputField
                        className={styles.form_input}
                        type="text"
                        name="name"
                        readOnly
                      />
                    </div>
                    <div className={styles.form_group}>
                      <span className={styles.form_group_span}>Target</span>
                      <InputField
                        className={styles.form_input}
                        type="text"
                        name="target"
                        readOnly
                      />
                    </div>
                    <div className={styles.form_group}>
                      <span className={styles.form_group_span}>Body part</span>
                      <InputField
                        className={styles.form_input}
                        type="text"
                        name="bodyPart"
                        readOnly
                      />
                    </div>
                    <div className={styles.form_group}>
                      <span className={styles.form_group_span}>Equipment</span>
                      <InputField
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
                    <Button
                      className={styles.create_exercises_diary_btn}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Add to diary'}
                    </Button>
                  </div>
                </DynamicForm>
              </div>
            )}
          </Container>
        </Modal>
      )}
    </>
  );
};

export default AddDiaryExercisesModal;
