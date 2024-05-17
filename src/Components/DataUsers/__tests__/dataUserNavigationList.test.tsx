import { render, screen } from '@testing-library/react';
import DataUserNavigationList from '../DataUserNavigationList/DataUserNavigationList';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('DataUserNavigationList', () => {
  const usePathnameMock = require('next/navigation').usePathname;

  it('renders the correct number of links', () => {
    usePathnameMock.mockReturnValue('/user-data');
    render(<DataUserNavigationList />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('applies the active class to the correct links based on the pathname', () => {
    usePathnameMock.mockReturnValue('/user-data/step-two');
    render(<DataUserNavigationList />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveClass('active_link');
    expect(links[1]).toHaveClass('active_link');

    expect(links[2]).toHaveClass('nav_pagination_link');
  });

  it('applies the active class only to the current and previous links', () => {
    usePathnameMock.mockReturnValue('/user-data/step-three');
    render(<DataUserNavigationList />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveClass('active_link');
    expect(links[1]).toHaveClass('active_link');
    expect(links[2]).toHaveClass('active_link');
  });

  it('applies the correct class to links when on the initial step', () => {
    usePathnameMock.mockReturnValue('/user-data');
    render(<DataUserNavigationList />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveClass('active_link');

    expect(links[1]).toHaveClass('nav_pagination_link');
    expect(links[2]).toHaveClass('nav_pagination_link');
  });
});
