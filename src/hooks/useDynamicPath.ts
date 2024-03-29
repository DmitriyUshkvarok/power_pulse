import { usePathname } from 'next/navigation';

export const useDynamicPath = () => {
  const pathname = usePathname();

  switch (pathname) {
    case '/exercises/body-parts':
      return '/body-parts/';
    case '/exercises/muscles':
      return '/muscles/';
    case '/exercises/equipment':
      return '/equipment/';
    default:
      return '/';
  }
};
