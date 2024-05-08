import { render, fireEvent, screen } from '@testing-library/react';
import Button from '../Buttons/ButtonSubmit/Button';

describe('Button component', () => {
  it('renders correctly', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('applies disabled attribute when disabled prop is true', () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} disabled>
        Click me
      </Button>
    );
    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });
});
