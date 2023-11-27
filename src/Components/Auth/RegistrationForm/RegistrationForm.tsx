'use client';
import styles from './RegistrationForm.module.scss';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { FormValues } from './index';
import { registrationSchema } from '@/src/formSchemas/registrationSchema';
import { signUpWithCredential } from '@/src/app/actions/authActions';

const initialValues: FormValues = {
  name: '',
  email: '',
  password: '',
};

function FormRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      setIsLoading(true);
      const res = await signUpWithCredential(values);
      await signIn('credentials', { ...values, callbackUrl: '/user-data' });
      alert('Registration Seccesfully!');
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
      <h1 className={styles.auth_title}>Sign Up</h1>
      <p className={styles.auth_description}>
        Thank you for your interest in our platform. To complete the
        registration process, please provide us with the following information.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form_registration}>
          <div className={styles.regisrt_form_group}>
            <Field
              className={styles.form_login_input}
              type="text"
              name="name"
              placeholder="Enter your name"
              aria-label="name"
            />
            <ErrorMessage name="name">
              {(msg) => <div className={styles.validation_error}>{msg}</div>}
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
            <ErrorMessage name="password">
              {(msg) => <div className={styles.validation_error}>{msg}</div>}
            </ErrorMessage>
          </div>
          <div>
            <button className={styles.registr_form_button} type="submit">
              {isLoading ? <p>Loading...</p> : <span>Sign Up</span>}
            </button>
          </div>
          <Link className={styles.link_registr} href="/signin">
            Already have account?
            <span className={styles.link_registr_span}> Sign In</span>
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
export default FormRegistration;
