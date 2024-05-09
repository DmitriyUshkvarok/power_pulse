import { render, fireEvent, screen } from '@testing-library/react';
import DaySwitch from '../DaySwitch/DaySwitch';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('../../../hooks/redux-hook.ts', () => ({
  useAppSelector: jest.fn().mockReturnValue('2024-05-08T00:00:00.000Z'),
  useAppDispatch: jest.fn(),
}));

const mockSession = {
  data: {
    user: {
      createdAt: '2024-07-24T00:00:00Z',
    },
  },
};
jest
  .spyOn(require('next-auth/react'), 'useSession')
  .mockReturnValue(mockSession);

describe('DaySwitch', () => {
  it('calls handlePrevDay when clicking previous button', () => {
    const handlePrevDay = jest.fn();

    const useDispatch = jest.spyOn(
      require('../../../hooks/redux-hook'),
      'useAppDispatch'
    );
    useDispatch.mockReturnValue(handlePrevDay);

    render(<DaySwitch />);

    const backButton = screen.getByTestId('back-button');

    fireEvent.click(backButton);

    expect(useDispatch).toHaveBeenCalledTimes(1);
  });

  it('calls handleNextDay when clicking next button', () => {
    const handleNextDay = jest.fn();

    const useDispatch = jest.spyOn(
      require('../../../hooks/redux-hook'),
      'useAppDispatch'
    );
    useDispatch.mockReturnValue(handleNextDay);

    render(<DaySwitch />);

    const nextButton = screen.getByTestId('next-button');

    fireEvent.click(nextButton);

    expect(useDispatch).toHaveBeenCalledTimes(1);
  });

  it("disables next button when current date equals today's date", () => {
    jest
      .spyOn(require('../../../hooks/redux-hook'), 'useAppSelector')
      .mockReturnValue(new Date().toISOString());

    render(<DaySwitch />);

    const nextButton = screen.getByTestId('next-button');

    expect(nextButton).toBeDisabled();
  });

  it('back button is disabled when current date is before user registration date', () => {
    jest
      .spyOn(require('../../../hooks/redux-hook'), 'useAppSelector')
      .mockReturnValue(mockSession.data.user.createdAt);

    render(<DaySwitch />);

    const backButton = screen.getByTestId('back-button');

    expect(backButton).toBeDisabled();
  });

  it('clicking back button decrements date', () => {
    const handlePrevDay = jest.fn();

    const useDispatch = jest.spyOn(
      require('../../../hooks/redux-hook'),
      'useAppDispatch'
    );
    useDispatch.mockReturnValue(handlePrevDay);

    render(<DaySwitch />);

    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);

    expect(useDispatch).toHaveBeenCalledTimes(1);

    const initialDateString = screen.getByTestId('date-text').textContent;
    const updatedDateString = screen.getByTestId('date-text').textContent;

    if (initialDateString && updatedDateString) {
      const initialDate = new Date(initialDateString);
      const updatedDate = new Date(updatedDateString);
      const oneDay = 24 * 60 * 60 * 1000;
      expect(updatedDate.getTime()).toBe(initialDate.getTime() - oneDay);
    } else {
      fail('Initial date string or updated date string is null');
    }
  });
});
