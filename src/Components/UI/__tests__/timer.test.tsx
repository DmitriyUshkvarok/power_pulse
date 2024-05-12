import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Timer from '../Timer/Timer';
import React from 'react';

jest.mock('../../../hooks/redux-hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.useFakeTimers();

const useStateMock = jest.spyOn(React, 'useState');
describe('Timer', () => {
  it('updates remaining time when started and paused', async () => {
    const dispatchMock = jest.fn();
    jest
      .spyOn(require('../../../hooks/redux-hook'), 'useAppDispatch')
      .mockReturnValue(dispatchMock);

    render(<Timer />);

    fireEvent.click(screen.getByAltText('icon start'));

    expect(screen.getByTestId('timer-text')).toHaveTextContent('3:00');

    fireEvent.click(screen.getByAltText('icon pause'));

    jest.advanceTimersByTime(5000);

    expect(screen.getByTestId('timer-text')).toHaveTextContent('3:00');
  });

  it('pauses timer and updates key', () => {
    render(<Timer />);

    fireEvent.click(screen.getByAltText('icon start'));

    expect(screen.getByTestId('timer-text')).toHaveTextContent('3:00');

    fireEvent.click(screen.getByAltText('icon pause'));

    expect(screen.getByAltText('icon start')).toBeInTheDocument();

    setTimeout(() => {
      jest.advanceTimersByTime(1000);

      const initialKey = screen.getByTestId('timer-circle').getAttribute('key');
      fireEvent.click(screen.getByAltText('icon start'));
      expect(
        screen.getByTestId('timer-circle').getAttribute('key')
      ).not.toEqual(initialKey);
    }, 1000);
  });
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

  it('updates key after timer completes', async () => {
    render(<Timer />);

    fireEvent.click(screen.getByAltText('icon start'));

    fireEvent.click(screen.getByAltText('icon pause'));

    setTimeout(() => {
      jest.advanceTimersByTime(1000);
      expect(screen.getByTestId('timer-circle')).toHaveAttribute('key', '1');
    }, 1000);
  });

  it('calls handleTimerComplete function when timer completes', () => {
    const setIsRunningMock = jest.fn();
    const setKeyMock = jest.fn();
    useStateMock.mockImplementation(() => [false, setIsRunningMock]);
    useStateMock.mockImplementation(() => [0, setKeyMock]);

    render(<Timer />);

    setTimeout(() => {
      jest.advanceTimersByTime(1000);
      expect(screen.getByTestId('timer-circle')).toHaveAttribute('key', '1');
      expect(setIsRunningMock).toHaveBeenCalledWith(false);
    }, 1000);
  });
});
