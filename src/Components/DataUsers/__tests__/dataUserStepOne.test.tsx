import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataUserStepOne from '../DataUserStepOne/DataUserStepOne';
import * as reduxHook from '../../../hooks/redux-hook';
import * as actions from '../../../redux/userData/userDataSlice';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('../../../hooks/redux-hook.ts');
jest.mock('../../../redux/userData/userDataSlice');

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

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

const useAppDispatch = jest.spyOn(reduxHook, 'useAppDispatch');
const updateUserData = jest.spyOn(actions, 'updateUserData');

describe('DataUserStepOne', () => {
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
});
