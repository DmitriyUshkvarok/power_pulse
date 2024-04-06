import { usePathname } from 'next/navigation';

export const useDynamicPath = (id?: string | number) => {
  const pathname = usePathname();

  switch (pathname) {
    case '/exercises/body-parts':
      return '/body-parts/';
    case '/exercises/muscles':
      return '/muscles/';
    case '/exercises/equipment':
      return '/equipment/';
    case `/exercises/body-parts/${id}`:
      return `/body-parts/${id}`;
    case `/exercises/muscles/${id}`:
      return `/muscles/${id}`;
    case `/exercises/equipment/${id}`:
      return `/equipment/${id}`;
    default:
      return '/';
  }
};
