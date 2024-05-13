import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Timer from '../Timer/Timer';
import React from 'react';

jest.mock('../../../hooks/redux-hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const dispatchMock = jest.fn();
jest
  .spyOn(require('../../../hooks/redux-hook'), 'useAppDispatch')
  .mockReturnValue(dispatchMock);

describe('Timer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  it('renders without crashing', () => {
    render(<Timer />);
    const timerElement = screen.getByTestId('timer');
    expect(timerElement).toBeInTheDocument();
  });

  it('updates remaining time when started and paused', async () => {
    render(<Timer />);
    fireEvent.click(screen.getByAltText('icon start'));
    expect(screen.getByTestId('timer-text')).toHaveTextContent('3:00');
    fireEvent.click(screen.getByAltText('icon pause'));
    jest.advanceTimersByTime(5000);
    expect(screen.getByTestId('timer-text')).toHaveTextContent('3:00');
  });
  it('starts, pauses, and completes timer correctly', () => {
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
});
