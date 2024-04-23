'use client';
import styles from './RegistrationForm.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import DynamicForm from '../../UI/DynamicForm/DynamicForm';
import Button from '../../UI/Buttons/ButtonSubmit/Button';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { FormValues } from './index';
import { registrationSchema } from '@/src/validation/registrationSchema';
import { signUpWithCredential } from '@/src/app/actions/authActions';
import { verifyWithCredentials } from '@/src/app/actions/authActions';

const initialValues: FormValues = {
  name: '',
  email: '',
  password: '',
};

function FormRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const res = await signUpWithCredential({ ...values });

      if (res && res.token) {
        await verifyWithCredentials(res.token);
        await signIn('credentials', {
          ...values,
          callbackUrl: '/user-data',
        });
      } else {
        setError('Error during registration');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else throw new Error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <h1 className={styles.auth_title}>Sign Up</h1>
      <p className={styles.auth_description}>
        Thank you for your interest in our platform. To complete the
        registration process, please provide us with the following information.
      </p>
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      <DynamicForm
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <div className={styles.form_registration}>
            <div className={styles.regisrt_form_group}>
              <Field
                className={styles.form_login_input}
                type="text"
                name="name"
                placeholder="Enter your name"
                aria-label="name"
              />
              {formikProps.touched.name && !formikProps.errors.name && (
                <div className={styles.success_text}>
                  <div>
                    <Image
                      src="/success.svg"
                      alt="success icon"
                      width={16}
                      height={16}
                    />
                  </div>
                  <span>success name</span>
                </div>
              )}
              <ErrorMessage name="name">
                {(msg) => (
                  <>
                    <div className={styles.validation_error}>
                      <Image
                        src="/error.svg"
                        alt="error icon"
                        width={16}
                        height={16}
                      />
                      <span>{msg}</span>
                    </div>
                  </>
                )}
              </ErrorMessage>
            </div>
            <div className={styles.regisrt_form_group}>
              <Field
                className={styles.form_login_input}
                type="email"
                name="email"
                placeholder="Enter your email"
                aria-label="email"
              />
              {formikProps.touched.email && !formikProps.errors.email && (
                <div className={styles.success_text}>
                  <div>
                    <Image
                      src="/success.svg"
                      alt="success icon"
                      width={16}
                      height={16}
                    />
                  </div>
                  <span>success email</span>
                </div>
              )}
              <ErrorMessage name="email">
                {(msg) => (
                  <>
                    <div className={styles.validation_error}>
                      <Image
                        src="/error.svg"
                        alt="error icon"
                        width={16}
                        height={16}
                      />
                      <span>{msg}</span>
                    </div>
                  </>
                )}
              </ErrorMessage>
            </div>
            <div className={styles.regisrt_form_group}>
              <div className={styles.show_password_wrapper}>
                <Field
                  className={styles.form_login_input}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Confirm a password"
                  aria-label="password"
                />
                <div
                  className={styles.form_login_input_btn_show_password}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <BsEyeSlash
                      color="#ffffff4d"
                      style={{ width: 18, height: 18, cursor: 'pointer' }}
                    />
                  ) : (
                    <BsEye
                      color="#ffffff4d"
                      style={{ width: 18, height: 18, cursor: 'pointer' }}
                    />
                  )}
                </div>
              </div>
              {formikProps.touched.password && !formikProps.errors.password && (
                <div className={styles.success_text}>
                  <div>
                    <Image
                      src="/success.svg"
                      alt="success icon"
                      width={16}
                      height={16}
                    />
                  </div>
                  <span>success password</span>
                </div>
              )}
              <ErrorMessage name="password">
                {(msg) => (
                  <>
                    <div className={styles.validation_error}>
                      <Image
                        src="/error.svg"
                        alt="error icon"
                        width={16}
                        height={16}
                      />
                      <span>{msg}</span>
                    </div>
                  </>
                )}
              </ErrorMessage>
            </div>
            <div>
              <Button
                disabled={isLoading}
                className={styles.registr_form_button}
                type="submit"
              >
                {isLoading ? 'Loading...' : 'Sign Up'}
              </Button>
            </div>
            <Link className={styles.link_registr} href="/signin">
              Already have account?
              <span className={styles.link_registr_span}> Sign In</span>
            </Link>
          </div>
        )}
      </DynamicForm>
      <Button
        className={styles.registr_form_button_google}
        type="submit"
        onClick={() => signIn('google', { callbackUrl: '/user-data' })}
      >
        <FcGoogle size={20} />
        <span> to continue with google</span>
      </Button>
    </div>
  );
}
export default FormRegistration;
