import { usePathname } from 'next/navigation';

export const useRouterBackForDynamicPageExercises = (id?: string | number) => {
  const pathname = usePathname();

  if (id) {
    if (pathname.startsWith(`/exercises/body-parts/${id}`)) {
      return '/exercises/body-parts';
    } else if (pathname.startsWith(`/exercises/muscles/${id}`)) {
      return '/exercises/muscles';
    } else if (pathname.startsWith(`/exercises/equipment/${id}`)) {
      return '/exercises/equipment';
    }
  }

  return '/';
};
//   switch (pathname) {
//     case `/exercises/body-parts/${id}`:
//       return `/exercises/body-parts`;
//     case `/exercises/muscles/${id}`:
//       return `/exercises/muscles`;
//     case `/exercises/equipment/${id}`:
//       return `/exercises/equipment`;
//     default:
//       return '/';
//   }
// };
