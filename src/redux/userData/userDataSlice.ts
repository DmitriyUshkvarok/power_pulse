import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  createDataUser,
  getUserDataById,
} from '@/src/app/actions/userDataActions';

export interface UserDataState {
  data: UserData;
  status: string;
  error: string | null;
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

export const fetchUserData = createAsyncThunk(
  'userData/fetch',
  async (userDataId: string) => {
    const response = await getUserDataById(userDataId);
    return response?.userData;
  }
);

const userDataPersistConfig = {
  key: 'userData',
  storage,
  whitelist: ['data'],
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    data: {
      height: '',
      currentWeight: '',
      desiredWeight: '',
      birthday: '',
      bloodGroup: '',
      sex: '',
      levelActivity: '',
    },
    status: 'loading',
    error: null,
  },
  reducers: {
    updateUserData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetUserData: (state) => {
      state.data = {
        height: '',
        currentWeight: '',
        desiredWeight: '',
        birthday: '',
        bloodGroup: '',
        sex: '',
        levelActivity: '',
      };
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDataAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createDataAsync.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
        state.status = 'succeeded';
      })
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      });
  },
});

export const { updateUserData, resetUserData } = userDataSlice.actions;

const persistUserDataReducer = persistReducer(
  userDataPersistConfig,
  userDataSlice.reducer
);

export default persistUserDataReducer;
