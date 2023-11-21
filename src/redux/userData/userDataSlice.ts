import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { createDataUser } from '@/src/app/actions/userDataActions';
import { getServerSession } from 'next-auth';

export interface UserDataState {
  items: UserData[];
}

export interface UserData {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
  bloodGroup: string;
  sex: string;
  levelActivity: string;
}

export const createDataAsync = createAsyncThunk(
  'userData/create',
  async ({ id, data }: { id: string; data: any }) => {
    const response = await createDataUser(data, id);
    return response;
  }
);

const userDataPersistConfig = {
  key: 'userData',
  storage,
  whitelist: ['items'],
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    items: [] as UserData[],
    status: 'idle',
  },
  reducers: {
    addUserData: (state, action) => {
      state.items.push(action.payload);
    },
    removeUserData: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createDataAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      });
  },
});

export const { addUserData, removeUserData } = userDataSlice.actions;

const persistUserDataReducer = persistReducer(
  userDataPersistConfig,
  userDataSlice.reducer
);

export default persistUserDataReducer;
