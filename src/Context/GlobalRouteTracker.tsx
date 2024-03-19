'use client';
import { useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/src/hooks/redux-hook';
import {
  addPreviousRouteForRedirect,
  setRoutingRelatedAuthCompleted,
} from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';

interface RootLayoutProps {
  children: React.ReactNode;
}

const GlobalRouteTracker = ({ children }: RootLayoutProps) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const authPaths = useMemo(() => ['/add-diary', '/create-product'], []);

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
