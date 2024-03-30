import { useMediaQuery } from 'react-responsive';

const useTabletItemsPerPage = () => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 960 });
  const itemsPerPage = isTablet ? 9 : 10;
  return itemsPerPage;
};

export default useTabletItemsPerPage;
