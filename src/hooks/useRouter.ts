import { useRouter } from 'next/navigation';

const useRouterPush = () => {
  const router = useRouter();

  const pushRoute = (route: string) => {
    router.push(route);
  };

  return { pushRoute };
};

export default useRouterPush;
