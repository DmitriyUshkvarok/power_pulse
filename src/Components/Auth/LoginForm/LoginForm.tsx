'use client';
import styles from './_LoginForm.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import DynamicForm from '../../UI/DynamicForm/DynamicForm';
import Button from '../../UI/Buttons/ButtonSubmit/Button';
import InputField from '../../UI/InputField/InputField';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { loginSchema } from '@/src/validation/loginSchema';
import { FormValues } from './types';

const initialValues: FormValues = {
  email: '',
  password: '',
};

function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await signIn('credentials', { ...values, callbackUrl: '/profile' });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
      <DynamicForm
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <div className={styles.form_registration}>
            <div className={styles.regisrt_form_group}>
              <InputField
                label="Email"
                name="email"
                inputClassName={styles.form_login_input}
                errorClassName={styles.validation_error}
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
            </div>
            <div className={styles.regisrt_form_group}>
              <div className={styles.show_password_wrapper}>
                <InputField
                  className={styles.form_login_input}
                  errorClassName={styles.validation_error}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Confirm a password"
                  aria-label="password"
                />
                <div
                  data-testid="toggle-password-button"
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
            </div>
            <div>
              <Button
                disabled={isLoading}
                className={styles.registr_form_button}
                type="submit"
              >
                {isLoading ? 'Loading...' : 'Sign In'}
              </Button>
            </div>
            <Link className={styles.link_registr} href="/signup">
              Don’t have an account?
              <span className={styles.link_registr_span}> Sign Up</span>
            </Link>
          </div>
        )}
      </DynamicForm>
      <Button
        className={styles.registr_form_button_google}
        type="submit"
        onClick={() => signIn('google', { callbackUrl: '/profile' })}
      >
        <FcGoogle size={20} />
        <span> to continue with google</span>
      </Button>
    </div>
  );
}
export default FormLogin;
