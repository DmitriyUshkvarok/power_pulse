import Image from 'next/image';
import { Field, ErrorMessage } from 'formik';

interface InputFieldProps {
  label?: string;
  inputClassName?: string;
  errorClassName?: string;
  classNameErrorIcon?: string;
  [key: string]: any;
}

const InputField = ({
  label,
  inputClassName,
  errorClassName,
  classNameErrorIcon,
  ...props
}: InputFieldProps) => {
  return (
    <>
      {label && <label>{label}</label>}
      <Field className={inputClassName} {...props} />
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
            <span>{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </>
  );
};

export default InputField;
