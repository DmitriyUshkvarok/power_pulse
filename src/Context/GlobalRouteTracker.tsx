'use client';
import { sessionSelectors } from '../redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import {
  addPreviousRouteForRedirect,
  setRoutingRelatedAuthCompleted,
} from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';

interface RootLayoutProps {
  children: React.ReactNode;
}

const GlobalRouteTracker = ({ children }: RootLayoutProps) => {
  const dispatch = useAppDispatch();
  const id = useAppSelector(sessionSelectors.getDynamicExercisesPageId);
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const authPaths = useMemo(
    () => [
      '/add-diary',
      '/create-product',
      '/create-exercises',
      `/exercises/body-parts/${id}/add-diary-exercises`,
      `/exercises/muscles/${id}/add-diary-exercises`,
      `/exercises/equipment/${id}/add-diary-exercises`,
    ],
    [id]
  );

  useEffect(() => {
    dispatch(setRoutingRelatedAuthCompleted(authPaths.includes(pathname)));
  }, [authPaths, dispatch, pathname]);

  useEffect(() => {
    if (!isFirstRender.current) {
      dispatch(addPreviousRouteForRedirect(pathname));
    } else {
      isFirstRender.current = false;
    }
  }, [dispatch, pathname]);

  return <>{children}</>;
};

export default GlobalRouteTracker;
