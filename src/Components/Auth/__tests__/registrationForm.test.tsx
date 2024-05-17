import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import {
  signUpWithCredential,
  verifyWithCredentials,
} from '@/src/app/actions/authActions';
import { signIn } from 'next-auth/react';
import FormRegistration from '../RegistrationForm/RegistrationForm';

const values = {
  name: 'User',
  email: 'test@example.com',
  password: 'password123',
};
const mockToken = 'mockToken';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

jest.mock('../../../models/users.ts', () => ({
  userSchema: {
    userData: { type: 'userDataSchema' },
  },
}));

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('../../../app/actions/authActions', () => ({
  signUpWithCredential: jest.fn().mockResolvedValueOnce({ token: 'mockToken' }),
  verifyWithCredentials: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('Form registration component', () => {
  it('renders form with name input', () => {
    render(<FormRegistration />);
    const passwordInput = screen.getByLabelText('name');
    expect(passwordInput).toBeInTheDocument();
  });
  it('renders form with email input', () => {
    render(<FormRegistration />);
    const emailInput = screen.getByLabelText('email');
    expect(emailInput).toBeInTheDocument();
  });

  it('renders form with password input', () => {
    render(<FormRegistration />);
    const passwordInput = screen.getByLabelText('password');
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders Sign Up button', () => {
    render(<FormRegistration />);
    const signInButton = screen.getByRole('button', { name: 'Sign Up' });
    expect(signInButton).toBeInTheDocument();
  });

  it('toggle password visibility on click', async () => {
    render(<FormRegistration />);
    const passwordInput = screen.getByLabelText('password');
    const togglePasswordButton = screen.getByTestId(
      'toggle-password-button-registration'
    );

    fireEvent.click(togglePasswordButton);
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    fireEvent.click(togglePasswordButton);
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  it('submits form with correct values', async () => {
    render(<FormRegistration />);
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const signInButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.change(nameInput, {
      target: { value: 'User' },
    });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signUpWithCredential).toHaveBeenCalledWith(values);
    });
    const res = await signUpWithCredential(values);

    if (res && res?.token) {
      await waitFor(() => {
        expect(verifyWithCredentials).toHaveBeenCalledWith(mockToken);
      });

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith('credentials', {
          ...values,
          callbackUrl: '/user-data',
        });
      });
    }
  });

  it('displays error message on failed registration', async () => {
    jest
      .spyOn(
        require('../../../app/actions/authActions'),
        'signUpWithCredential'
      )
      .mockRejectedValueOnce(new Error('Registration failed'));

    render(<FormRegistration />);
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const signInButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.change(nameInput, {
      target: { value: 'User' },
    });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signUpWithCredential).toHaveBeenCalledWith(values);
    });

    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
  });

  it('displays error message on failed registration (not token)', async () => {
    jest
      .spyOn(
        require('../../../app/actions/authActions'),
        'signUpWithCredential'
      )
      .mockResolvedValueOnce({});

    render(<FormRegistration />);
    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const signInButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.change(nameInput, {
      target: { value: 'User' },
    });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signUpWithCredential).toHaveBeenCalledWith(values);
    });

    await waitFor(() => {
      expect(screen.getByText('Error during registration')).toBeInTheDocument();
    });
  });

  it('displays loading state when submitting', async () => {
    render(<FormRegistration />);

    const nameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');

    fireEvent.change(nameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    jest
      .spyOn(
        require('../../../app/actions/authActions'),
        'signUpWithCredential'
      )
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

    fireEvent.submit(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });
});
