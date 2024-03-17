'use client';
import WellDoneDiaryModal from '../WellDoneDiaryModal/WellDoneDiaryModal';
import AddDiaryModal from '../AddDiaryModal/AddDiaryModal';
import { useAppSelector } from '@/src/hooks/redux-hook';

const CommonContainerForDiaryModal = () => {
  const isWellDoneDiaryModalOpen = useAppSelector(
    (state) => state.globalLocalSession.isWellDoneDiaryModalOpen
  );
  return (
    <>{isWellDoneDiaryModalOpen ? <WellDoneDiaryModal /> : <AddDiaryModal />}</>
  );
};

export default CommonContainerForDiaryModal;
