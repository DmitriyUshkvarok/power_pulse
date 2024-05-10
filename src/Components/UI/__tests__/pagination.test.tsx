import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination/Pagination';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Pagination', () => {
  it('renders pagination with correct buttons and functionality', () => {
    const totalItems = 100;
    const itemsPerPage = 10;
    const currentPage = 1;
    const onPageChange = jest.fn();

    render(
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationButtons = screen.getAllByTestId(/page-\d+/);
    expect(paginationButtons.length).toBe(totalPages);

    const activeButton = screen.getByText('1');
    expect(activeButton).toHaveClass('active');

    fireEvent.click(paginationButtons[1]);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
