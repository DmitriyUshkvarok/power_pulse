import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FormLogin from '../LoginForm/LoginForm';

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
});
