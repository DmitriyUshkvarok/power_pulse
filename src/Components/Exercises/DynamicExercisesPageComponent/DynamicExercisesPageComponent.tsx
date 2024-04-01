'use client';
import Link from 'next/link';
import AddExercisesForm from '../../Modals/AddExercisesModal/AddExercisesModal';
import Modal from '../../Modals/Modal/Modal';
import { useAppDispatch } from '@/src/hooks/redux-hook';
import {
  openCreatedExercisesModal,
  openModal,
} from '@/src/redux/modalSlice/modalSlice';

interface PageId {
  id?: string | number;
}

const DynamicExercisesPageComponent = ({ id }: PageId) => {
  const dispatch = useAppDispatch();
  const openModalCreate = () => {
    dispatch(openModal());
    dispatch(openCreatedExercisesModal());
  };
  return (
    <div>
      <Link
        onClick={openModalCreate}
        style={{ textAlign: 'center', color: 'white' }}
        href="/create-exercises"
      >
        {id}
      </Link>
      {/* <Modal>
        <AddExercisesForm id={id} />
      </Modal> */}
    </div>
  );
};

export default DynamicExercisesPageComponent;
