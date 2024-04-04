import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

interface ModalState {
  isWellDoneDiaryModalOpen: boolean;
  isCreatedModalOpen: boolean;
  isAddDiaryModalOpen: boolean;
  isCreatedExercisesModalOpen: boolean;
  isModalOpen: boolean;
  showMobileMenu: boolean;
}

const initialState: ModalState = {
  isWellDoneDiaryModalOpen: false,
  isCreatedModalOpen: false,
  isAddDiaryModalOpen: false,
  isModalOpen: false,
  isCreatedExercisesModalOpen: false,
  showMobileMenu: false,
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
