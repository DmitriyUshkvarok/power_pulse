import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { ModalState } from './types';

const initialState: ModalState = {
  isWellDoneDiaryModalOpen: false,
  isCreatedModalOpen: false,
  isAddDiaryModalOpen: false,
  isModalOpen: false,
  isCreatedExercisesModalOpen: false,
  showMobileMenu: false,
  isAddDiaryExercisesModalOpen: false,
  isWellDoneExercisesDiaryModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openWellDoneDiaryModal: (state) => {
      state.isWellDoneDiaryModalOpen = true;
    },
    openCreatedModal: (state) => {
      state.isCreatedModalOpen = true;
    },
    openAddDiaryModal: (state) => {
      state.isAddDiaryModalOpen = true;
    },
    openCreatedExercisesModal: (state) => {
      state.isCreatedExercisesModalOpen = true;
    },
    openAddDiaryExercisesModal: (state) => {
      state.isAddDiaryExercisesModalOpen = true;
    },
    openWellDoneExercisesDiaryModal: (state) => {
      state.isWellDoneExercisesDiaryModal = true;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    setShowMobileMenu: (state) => {
      state.showMobileMenu = true;
    },
    closeModal: (state) => {
      state.isWellDoneDiaryModalOpen = false;
      state.isCreatedModalOpen = false;
      state.isAddDiaryModalOpen = false;
      state.isCreatedExercisesModalOpen = false;
      state.isModalOpen = false;
      state.showMobileMenu = false;
      state.isAddDiaryExercisesModalOpen = false;
      state.isWellDoneExercisesDiaryModal = false;
    },
  },
});

export const {
  openWellDoneDiaryModal,
  openCreatedModal,
  openAddDiaryModal,
  openCreatedExercisesModal,
  openModal,
  closeModal,
  setShowMobileMenu,
  openAddDiaryExercisesModal,
  openWellDoneExercisesDiaryModal,
} = modalSlice.actions;

const persistConfig = {
  key: 'modal',
  storage: storageSession,
};

export const persistedModalReducer = persistReducer(
  persistConfig,
  modalSlice.reducer
);

export default persistedModalReducer;
