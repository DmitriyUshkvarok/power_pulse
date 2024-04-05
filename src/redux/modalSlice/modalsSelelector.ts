import { RootState } from '../store';

const getWellDoneDiaryModalOpen = (state: RootState) =>
  state.modals.isWellDoneDiaryModalOpen;

const getIsModalOpen = (state: RootState) => state.modals.isModalOpen;

const getIsCreatedModalOpen = (state: RootState) =>
  state.modals.isCreatedModalOpen;

const getIsAddDiaryModalOpen = (state: RootState) =>
  state.modals.isAddDiaryModalOpen;

const getIsCreatedExercisesModalOpen = (state: RootState) =>
  state.modals.isCreatedExercisesModalOpen;

const getShowMobileMenu = (state: RootState) => state.modals.showMobileMenu;

const getIsAddDiaryExercisesModalOpen = (state: RootState) =>
  state.modals.isAddDiaryExercisesModalOpen;

export const modalsSelectors = {
  getWellDoneDiaryModalOpen,
  getIsModalOpen,
  getIsCreatedModalOpen,
  getIsAddDiaryModalOpen,
  getIsCreatedExercisesModalOpen,
  getShowMobileMenu,
  getIsAddDiaryExercisesModalOpen,
};
