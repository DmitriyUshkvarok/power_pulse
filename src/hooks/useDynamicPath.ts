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
    case `/exercises/body-parts/${id}/add-diary-exercises`:
      return `/body-parts/${id}`;
    case `/exercises/muscles/${id}/add-diary-exercises`:
      return `/muscles/${id}`;
    case `/exercises/equipment/${id}/add-diary-exercises`:
      return `/equipment/${id}`;
    default:
      return '/';
  }
};
