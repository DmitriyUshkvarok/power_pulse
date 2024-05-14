import { render, screen } from '@testing-library/react';
import AuthPageDecor from '../AuthPageDecor/AuthPageDecor';

describe('AuthPageDecor component', () => {
  test('renders video tutorial banner with correct title', () => {
    render(<AuthPageDecor />);
    const titleElement = screen.getByText('350+');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders video tutorial banner with correct description', () => {
    render(<AuthPageDecor />);
    const descriptionElement = screen.getByText('Video tutorial');
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders cal banner with correct title', () => {
    render(<AuthPageDecor />);
    const titleElement = screen.getByText('500');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders cal banner with correct description', () => {
    render(<AuthPageDecor />);
    const descriptionElement = screen.getByText('cal');
    expect(descriptionElement).toBeInTheDocument();
  });
});
