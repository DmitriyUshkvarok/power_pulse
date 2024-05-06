import { render, fireEvent, screen } from '@testing-library/react';
import ButtonBack from '../Buttons/ButtonBack/ButtonBack';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock('../../../hooks/useRouterBackForDynmicPageExercises.ts', () => ({
  useRouterBackForDynamicPageExercises: jest.fn(() => '/dynamicPagePath'),
}));

jest.mock('../../../hooks/redux-hook.ts', () => ({
  useAppSelector: jest.fn(),
}));

describe('ButtonBack', () => {
  it('should navigate back to dynamic page when clicked', () => {
    const useRouterMock = jest.spyOn(require('next/navigation'), 'useRouter');
    useRouterMock.mockReturnValue({
      push: jest.fn(),
    });

    const dynamicPath = '/dynamicPagePath';
    render(<ButtonBack />);
    fireEvent.click(screen.getByText('Back'));
    expect(useRouterMock).toHaveBeenCalled();
    expect(useRouterMock.mock.results[0].value.push).toHaveBeenCalledWith(
      dynamicPath
    );
  });
});
