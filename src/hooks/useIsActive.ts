import { usePathname } from 'next/navigation';

const useIsActive = () => {
  const pathname = usePathname();

  return (path: string) => {
    return (
      new RegExp(`^${path}`).test(pathname) ||
      pathname.startsWith('/exercises/muscles') ||
      pathname.startsWith('/exercises/equipment')
    );
  };
};

export default useIsActive;
