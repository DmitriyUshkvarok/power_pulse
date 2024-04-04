import styles from './_dymamic_exercises_component.module.scss';
import ExercisesSubList from '../ExercisesSubList/ExercisesSubList';
import ExercisesCreatePanel from '../ExercisesCreatePanel/ExercisesCreatePanel';
import Container from '../../Container/Container';
import ButtonBack from '../../UI/Buttons/ButtonBack/ButtonBack';
import { getServerSession } from 'next-auth';
import { authOption } from '@/src/app/api/auth/[...nextauth]/route';
import {
  getExerciseCardsByUserId,
  getExerciseSubCategory,
} from '@/src/app/actions/exercisesActions';
export interface ParamsId {
  id: string;
}

const DynamicExercisesPageComponent = async ({ id }: ParamsId) => {
  const session = await getServerSession(authOption);
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
    </section>
  );
};

export default DynamicExercisesPageComponent;
