import styles from './_dymamic_exercises_component.module.scss';
import ExercisesSubList from '../ExercisesSubList/ExercisesSubList';
import ExercisesCreatePanel from '../ExercisesCreatePanel/ExercisesCreatePanel';
import Container from '../../Container/Container';
import ButtonBack from '../../UI/Buttons/ButtonBack/ButtonBack';
import Modal from '@/src/Components/Modals/Modal/Modal';
import AddExercisesForm from '@/src/Components/Modals/AddExercisesModal/AddExercisesModal';
import { ParamsId } from './types';
import {
  getExerciseCardsByUserId,
  getExerciseSubCategory,
} from '@/src/app/actions/exercisesActions';
import { getSessionWithAuthOptions } from '@/src/utils/serverSession';

const DynamicExercisesPageComponent = async ({ id }: ParamsId) => {
  const session = await getSessionWithAuthOptions();
  const userId = session?.user?._id;
  const exercisesSubListData = await getExerciseCardsByUserId(userId);
  const exerciseList = await getExerciseSubCategory();
  return (
    <section className={styles.dynamic_exercises_page_section}>
      <Container>
        <>
          <div className={styles.back_button_container}>
            <ButtonBack />
          </div>
          <ExercisesCreatePanel id={id} exerciseList={exerciseList} />
          <ExercisesSubList
            id={id}
            exercisesSubListData={exercisesSubListData}
          />
        </>
      </Container>
      <Modal>
        <AddExercisesForm id={id} />
      </Modal>
    </section>
  );
};

export default DynamicExercisesPageComponent;
