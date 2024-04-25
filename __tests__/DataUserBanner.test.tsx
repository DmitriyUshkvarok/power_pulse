import { render, screen } from '@testing-library/react';
import DataUserBanner from '@/src/Components/DataUsers/DataUserBanner/DataUserBanner';

it('should have docs text', () => {
  render(<DataUserBanner />);
  const element = screen.getByText(/Video tutorial/i);
  expect(element).toBeInTheDocument();
});
