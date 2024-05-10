import { render, screen } from '@testing-library/react';
import LoaderApp from '../Loaders/LoaderApp/LoaderApp';

describe('LoaderApp', () => {
  it('renders loader with correct image and class names', () => {
    render(<LoaderApp />);

    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toBeInTheDocument();

    const loaderImage = screen.getByAltText('sport icon loader');
    expect(loaderImage).toBeInTheDocument();

    expect(loaderContainer).toHaveClass('loaderContainer');

    expect(loaderImage).toHaveClass('orangeIcon');
  });
});
