'use client';
import styles from './_pagination.module.scss';
import { useRouter, usePathname } from 'next/navigation';
import { PaginationProps } from './types';

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    router.push(`${pathname}/?current-page-${page}`);
  };

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`${styles.pagination_btn_count} ${
            index + 1 === currentPage ? styles.active : ''
          }`}
          onClick={() => handlePageChange(index + 1)}
          data-testid={`page-${index + 1}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
