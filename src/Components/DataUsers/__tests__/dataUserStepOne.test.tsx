import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataUserStepOne from '../DataUserStepOne/DataUserStepOne';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/src/hooks/redux-hook';
// import * as reduxHook from '../../../hooks/redux-hook';
// import * as actions from '../../../redux/userData/userDataSlice';
import { updateUserData } from '../../../redux/userData/userDataSlice';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

jest.mock('../../../hooks/redux-hook');

// jest.mock('../../../redux/userData/userDataSlice.ts');

jest.mock('../../../models/userDataModel.ts', () => ({
  userDataSchema: {
    height: String,
    currentWeight: String,
    desiredWeight: String,
    birthday: String,
    bloodGroup: String,
    sex: String,
    levelActivity: String,
  },
}));

jest.mock('../../../models/users.ts', () => ({
  userSchema: {
    userData: { type: 'userDataSchema' },
  },
}));

// const useAppDispatch = jest.spyOn(reduxHook, 'useAppDispatch');
// const updateUserData = jest.spyOn(actions, 'updateUserData');

describe('DataUserStepOne', () => {
  const useRouterMock = useRouter as jest.Mock;
  const useAppDispatchMock = useAppDispatch as jest.Mock;
  const dispatch = jest.fn();

  beforeEach(() => {
    useAppDispatchMock.mockImplementation(() => dispatch);
    useRouterMock.mockReturnValue({
      push: jest.fn(),
    });

    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(<DataUserStepOne />);

    expect(screen.getByText('Get closer to your goals!')).toBeInTheDocument();
    expect(screen.getByTestId('height')).toBeInTheDocument();
    expect(screen.getByTestId('current-weight')).toBeInTheDocument();
    expect(screen.getByTestId('desired weight')).toBeInTheDocument();
    expect(screen.getByTestId('birthday')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('toggles calendar visibility when the calendar icon is clicked', async () => {
    render(<DataUserStepOne />);

    const calendarIcon = screen.getByAltText('calendar icon');

    fireEvent.click(calendarIcon);

    const calendarComponent = screen.getByTestId('calendar-backdrop');

    await waitFor(() => {
      expect(calendarComponent).toBeInTheDocument();
    });
  });

  it('displays validation success message for valid input fields', () => {
    render(<DataUserStepOne />);

    const heightInput = screen.getByLabelText('height');
    fireEvent.change(heightInput, { target: { value: '180' } });
    fireEvent.blur(heightInput);

    expect(screen.getByText('success height')).toBeInTheDocument();
  });

  it('submits form data and navigates to the next step', () => {
    render(<DataUserStepOne />);
    const value = {
      height: '',
      currentWeight: '',
      desiredWeight: '',
      birthday: '',
    };
    fireEvent.click(screen.getByText('Next'));

    expect(useAppDispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(updateUserData(value));

    // Проверяем, что произошла навигация на следующий экран
    // expect(pushRoute).toHaveBeenCalledWith('/user-data/step-two');
  });
});
