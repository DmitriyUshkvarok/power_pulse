import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Timer from '../Timer/Timer';

jest.mock('../../../hooks/redux-hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.useFakeTimers();
describe('Timer', () => {
  it('starts, pauses, and completes timer correctly', () => {
    const dispatchMock = jest.fn();
    jest
      .spyOn(require('../../../hooks/redux-hook'), 'useAppDispatch')
      .mockReturnValue(dispatchMock);

    render(<Timer />);

    expect(screen.queryByAltText('icon pause')).not.toBeInTheDocument();

    fireEvent.click(screen.getByAltText('icon start'));

    expect(screen.getByAltText('icon pause')).toBeInTheDocument();

    expect(screen.getByAltText('icon pause')).toBeInTheDocument();

    fireEvent.click(screen.getByAltText('icon pause'));

    expect(screen.queryByAltText('icon pause')).not.toBeInTheDocument();

    setTimeout(() => {
      expect(screen.queryByAltText('icon pause')).not.toBeInTheDocument();
      expect(screen.getByAltText('icon start')).toBeInTheDocument();
    }, 180000);
  });
  it('displays remaining time correctly', () => {
    render(<Timer />);

    expect(screen.getByText('3:00')).toBeInTheDocument();

    const timerText = screen.getByTestId('timer-text').textContent;

    expect(timerText).toMatch('3:00');
  });
  it('completes timer correctly - stops timer', async () => {
    render(<Timer />);

    fireEvent.click(screen.getByAltText('icon start'));

    expect(screen.getByAltText('icon pause')).toBeInTheDocument();

    fireEvent.click(screen.getByAltText('icon pause'));

    await waitFor(() => {
      expect(screen.getByAltText('icon start')).toBeInTheDocument();
    });
  });

  //   it('completes timer correctly - updates key', async () => {
  //     render(<Timer />);

  //     fireEvent.click(screen.getByAltText('icon start'));

  //     expect(screen.getByAltText('icon pause')).toBeInTheDocument();

  //     fireEvent.click(screen.getByAltText('icon pause'));

  //     await waitFor(() => {
  //       expect(screen.getByTestId('timer-circle')).toHaveAttribute('key', '1');
  //     });
  //   });
});
