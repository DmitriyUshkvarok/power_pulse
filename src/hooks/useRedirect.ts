'use client';
import { useRouter } from 'next/navigation';
import { useAppSelector } from './redux-hook';

interface RedirectHook {
  handleRedirect: () => void;
}

const useAuthRedirect = (): RedirectHook => {
  const router = useRouter();
  const previousRouteForRedirect = useAppSelector(
    (state) => state.globalLocalSession.previousRouteForRedirect
  );

  const handleRedirect = () => {
    if (previousRouteForRedirect) {
      router.push(previousRouteForRedirect);
      //   resetOpenModal();
    } else {
      router.push('/');
    }
  };

  return { handleRedirect };
};

export default useAuthRedirect;
