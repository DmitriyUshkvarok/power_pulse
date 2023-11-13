import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface UserData {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
}

const userDataPersistConfig = {
  key: 'userData',
  storage,
  whitelist: ['items'],
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    items: [] as UserData[],
  },
  reducers: {
    addUserData: (state, action) => {
      state.items.push(action.payload);
    },
    removeUserData: (state) => {
      state.items = [];
    },
  },
});

export const { addUserData, removeUserData } = userDataSlice.actions;

const persistUserDataReducer = persistReducer(
  userDataPersistConfig,
  userDataSlice.reducer
);

export default persistUserDataReducer;
