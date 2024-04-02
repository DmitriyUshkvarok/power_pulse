'use client';
import styles from './_dymamic_exercises_component.module.scss';
import AddExercisesForm from '../../Modals/AddExercisesModal/AddExercisesModal';
import Modal from '../../Modals/Modal/Modal';
import ExercisesSubList from '../ExercisesSubList/ExercisesSubList';
import { useAppDispatch } from '@/src/hooks/redux-hook';
import {
  openCreatedExercisesModal,
  openModal,
} from '@/src/redux/modalSlice/modalSlice';
import { useRouter } from 'next/navigation';
interface PageId {
  id?: string | number;
}

const DynamicExercisesPageComponent = ({ id }: PageId) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const openModalCreate = () => {
    dispatch(openModal());
    dispatch(openCreatedExercisesModal());
    router.push(`${id}?create-exercise`);
  };
  return (
    <section className={styles.dynamic_exercises_page_section}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <div
          onClick={openModalCreate}
          className={styles.add_exercises_sub_list}
        >
          Add a exercises cards
        </div>
      </div>
      <ExercisesSubList id={id} />
      <Modal>
        <AddExercisesForm id={id} />
      </Modal>
    </section>
  );
};

export default DynamicExercisesPageComponent;
