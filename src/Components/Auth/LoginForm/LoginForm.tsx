'use client';
import styles from './_LoginForm.module.scss';
import * as yup from 'yup';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .test(
      'email-format',
      'Invalid email format',
      (value: string | undefined) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value || '');
      }
    )
    .required(),
  password: yup
    .string()
    .min(8)
    .max(64)
    .matches(/^[^\s]+$/, 'Password should not contain spaces')
    .required(),
});

function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    setIsLoading(true);
    console.log(values);
    try {
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    resetForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <h1 className={styles.auth_title}>Sign In</h1>
      <p className={styles.auth_description}>
        Welcome! Please enter your credentials to login to the platform:
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form_registration}>
          <div className={styles.regisrt_form_group}>
            <Field
              className={styles.form_login_input}
              type="email"
              name="email"
              placeholder="Enter your email"
              aria-label="email"
            />
            <ErrorMessage name="email">
              {(msg) => <div className={styles.validation_error}>{msg}</div>}
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
                    style={{ width: 18, height: 18 }}
                  />
                ) : (
                  <BsEye color="#ffffff4d" style={{ width: 18, height: 18 }} />
                )}
              </div>
            </div>
            <ErrorMessage name="password">
              {(msg) => <div className={styles.validation_error}>{msg}</div>}
            </ErrorMessage>
          </div>
          <div>
            <button className={styles.registr_form_button} type="submit">
              {isLoading ? <p>Loading...</p> : <span>Sign In</span>}
            </button>
          </div>
          <Link className={styles.link_registr} href="/signup">
            Don’t have an account?
            <span className={styles.link_registr_span}> Sign Up</span>
          </Link>
        </Form>
      </Formik>
      <button
        className={styles.registr_form_button_google}
        type="submit"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        <FcGoogle size={20} />
        <span> to continue with google</span>
      </button>
    </div>
  );
}
export default FormLogin;
