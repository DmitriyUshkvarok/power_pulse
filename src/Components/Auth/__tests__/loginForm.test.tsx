import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FormLogin from '../LoginForm/LoginForm';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));
describe('FormLogin component', () => {
  it('renders form with email input', () => {
    render(<FormLogin />);
    const emailInput = screen.getByLabelText('email');
    expect(emailInput).toBeInTheDocument();
  });

  it('renders form with password input', () => {
    render(<FormLogin />);
    const passwordInput = screen.getByLabelText('password');
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders Sign In button', () => {
    render(<FormLogin />);
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    expect(signInButton).toBeInTheDocument();
  });

  it('toggle password visibility on click', async () => {
    render(<FormLogin />);
    const passwordInput = screen.getByLabelText('password');
    const togglePasswordButton = screen.getByTestId('toggle-password-button');

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
    render(<FormLogin />);
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const signInButton = await screen.findAllByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton[0]);
  });

  it('submits form with correct values', async () => {
    jest.spyOn(require('next-auth/react'), 'signIn');
    render(<FormLogin />);
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        callbackUrl: '/profile',
      });
    });
  });

  it('displays loading state when submitting', async () => {
    render(<FormLogin />);

    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    jest
      .spyOn(require('next-auth/react'), 'signIn')
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

    fireEvent.submit(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });
});
