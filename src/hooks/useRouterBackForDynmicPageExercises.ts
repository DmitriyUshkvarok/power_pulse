import { usePathname } from 'next/navigation';

export const useRouterBackForDynamicPageExercises = (id?: string | number) => {
  const pathname = usePathname();

  switch (pathname) {
    case `/exercises/body-parts/${id}`:
      return `/exercises/body-parts`;
    case `/exercises/muscles/${id}`:
      return `/exercises/muscles`;
    case `/exercises/equipment/${id}`:
      return `/exercises/equipment`;
    default:
      return '/';
  }
};
