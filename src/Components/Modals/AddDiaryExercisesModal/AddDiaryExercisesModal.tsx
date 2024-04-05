'use client';
import Modal from '../Modal/Modal';
import Container from '../../Container/Container';
import { modalsSelectors } from '@/src/redux/modalSlice/modalsSelelector';
import { useAppSelector } from '@/src/hooks/redux-hook';

const AddDiaryExercisesModal = () => {
  const isAddDiaryExercisesModalOpen = useAppSelector(
    modalsSelectors.getIsAddDiaryExercisesModalOpen
  );
  return (
    <Modal>
      <Container>
        {isAddDiaryExercisesModalOpen && (
          <div style={{ color: 'yellow' }}>Hello World! I am a modal.</div>
        )}
      </Container>
    </Modal>
  );
};

export default AddDiaryExercisesModal;
