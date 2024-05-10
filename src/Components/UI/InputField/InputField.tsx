import Image from 'next/image';
import { Field, ErrorMessage } from 'formik';
import { InputFieldProps } from './types';

const InputField = ({
  label,
  inputClassName,
  errorClassName,
  classNameErrorIcon,
  ...props
}: InputFieldProps) => {
  const inputId = props.id || props.name;
  return (
    <>
      {label && <label htmlFor={inputId}>{label}</label>}
      <Field id={inputId} className={inputClassName} {...props} />
      <ErrorMessage name={props.name}>
        {(msg) => (
          <div className={errorClassName}>
            <Image
              className={classNameErrorIcon}
              src="/error.svg"
              alt="error icon"
              width={16}
              height={16}
            />
            <span data-testid="error-message">{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </>
  );
};

export default InputField;
