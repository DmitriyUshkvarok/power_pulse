'use client';
import styles from './_exercises_create_panel.module.scss';
import { useAppDispatch } from '@/src/hooks/redux-hook';
import {
  openCreatedExercisesModal,
  openModal,
} from '@/src/redux/modalSlice/modalSlice';
import { useRouter } from 'next/navigation';
import { ExerciseList } from '@/src/app/actions/exercisesActions';

interface ExercisesListProps {
  id?: string | number;
  exerciseList: ExerciseList[];
}

const ExercisesCreatePanel = ({ id, exerciseList }: ExercisesListProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const exerciseTitle = exerciseList.find((item) => item._id === id);

  const openModalCreate = () => {
    dispatch(openModal());
    dispatch(openCreatedExercisesModal());
    router.push(`${id}?create-exercise`);
  };

  return (
    <div className={styles.panel_container}>
      <h1 className={styles.dynamic_page_title}>{exerciseTitle?.title}</h1>
      <div onClick={openModalCreate} className={styles.add_exercises_sub_list}>
        Add a exercises cards
      </div>
    </div>
  );
};

export default ExercisesCreatePanel;
