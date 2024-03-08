'use client';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';

export interface RootLayoutProps {
  children: React.ReactNode;
}

const ReduxProvider = ({ children }: RootLayoutProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
