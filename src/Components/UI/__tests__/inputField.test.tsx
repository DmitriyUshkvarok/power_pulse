import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import InputField from '../InputField/InputField';

const testPlaceholder = 'test placeholder';
describe('InputField', () => {
  it('renders input field with label correctly', () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </Form>
      </Formik>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders input field without label correctly', () => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <InputField
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </Form>
      </Formik>
    );

    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('should render the input', () => {
    const validationSchema = {
      email: 'Invalid email',
    };
    render(
      <Formik
        initialValues={{ email: '' }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        <Form>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder={testPlaceholder}
          />
        </Form>
      </Formik>
    );
    expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument();
  });

  it('should render the input with the correct type', () => {
    const validationSchema = {
      email: 'Invalid email',
    };
    render(
      <Formik
        initialValues={{ email: '' }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        <Form>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder={testPlaceholder}
          />
        </Form>
      </Formik>
    );
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('should render the input with the correct class names', () => {
    const validationSchema = {
      email: 'Invalid email',
    };
    render(
      <Formik
        initialValues={{ email: '' }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        <Form>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder={testPlaceholder}
            inputClassName="classname test"
          />
        </Form>
      </Formik>
    );

    const inputElement = screen.getByPlaceholderText(testPlaceholder);
    expect(inputElement).toHaveClass('classname');
    expect(inputElement).toHaveClass('test');
  });

  it('should render the input with the correct value', () => {
    const validationSchema = {
      email: 'Invalid email',
    };
    render(
      <Formik
        initialValues={{ email: '' }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        <Form>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder={testPlaceholder}
            inputClassName="classname test"
            onChange={jest.fn()}
            value="123"
          />
        </Form>
      </Formik>
    );

    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  });

  it('should invoke the onChange callback', () => {
    const onChange = jest.fn();
    const validationSchema = {
      email: 'Invalid email',
    };
    render(
      <Formik
        initialValues={{ email: '' }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        <Form>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder={testPlaceholder}
            inputClassName="classname test"
            onChange={onChange}
            value="123"
          />
        </Form>
      </Formik>
    );
    const element = screen.getByPlaceholderText(testPlaceholder);
    fireEvent.change(element, { target: { value: '12345' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
