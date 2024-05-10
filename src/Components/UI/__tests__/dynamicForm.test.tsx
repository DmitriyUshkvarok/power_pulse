import { render, screen } from '@testing-library/react';
import DynamicForm from '../DynamicForm/DynamicForm';

describe('DynamicForm', () => {
  it('renders form correctly', () => {
    const initialValues = { email: '', password: '' };
    const validationSchema = {};
    const onSubmit = jest.fn();

    render(
      <DynamicForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <>
            <input type="text" name="email" data-testid="email-input" />
            <input
              type="password"
              name="password"
              data-testid="password-input"
            />
            <button type="submit" data-testid="submit-button">
              Submit
            </button>
          </>
        )}
      </DynamicForm>
    );

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('renders children correctly when children is a function', () => {
    const initialValues = { email: '', password: '' };
    const validationSchema = {};
    const onSubmit = jest.fn();

    render(
      <DynamicForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <>
            <input
              type="text"
              name="email"
              data-testid="email-input"
              value={formikProps.values.email}
            />
            <input
              type="password"
              name="password"
              data-testid="password-input"
              value={formikProps.values.password}
            />
            <button type="submit" data-testid="submit-button">
              Submit
            </button>
          </>
        )}
      </DynamicForm>
    );

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('renders children correctly when children is not a function', () => {
    const initialValues = { email: '', password: '' };
    const validationSchema = {};
    const onSubmit = jest.fn();

    render(
      <DynamicForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <>
          <input type="text" name="email" data-testid="email-input" />
          <input type="password" name="password" data-testid="password-input" />
          <button type="submit" data-testid="submit-button">
            Submit
          </button>
        </>
      </DynamicForm>
    );

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });
});
