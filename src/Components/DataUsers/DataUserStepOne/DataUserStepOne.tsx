'use client';
import styles from './_DataUserStepOne.module.scss';
import Container from '../../Container/Container';
import * as yup from 'yup';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import Link from 'next/link';
import Image from 'next/image';

interface FormValuesDataStepOne {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
}

const initialValues: FormValuesDataStepOne = {
  height: '',
  currentWeight: '',
  desiredWeight: '',
  birthday: '',
};

const schema = yup.object().shape({
  height: yup.string().required(),
  currentWeight: yup.string().required(),
  desiredWeight: yup.string().required(),
  birthday: yup.date().required(),
});

const DataUserStepOne = () => {
  const handleSubmit = (
    values: FormValuesDataStepOne,
    actions: FormikHelpers<FormValuesDataStepOne>
  ) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  const handleSaveValuesToGlobalState = () => {};
  return (
    <section className={styles.step_one_section}>
      <Container>
        <h1 className={styles.step_one_title}>Get closer to your goals!</h1>
        <p className={styles.step_one_description}>
          To ensure a personalized user experience and the proper functioning of
          our platform, we ask you to provide the following information about
          your weight, height and other relevant data:
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form_step_one}>
            <div className={styles.step_one_form_group}>
              <Field
                className={styles.form_step_one_input}
                type="text"
                name="height"
                placeholder="Height"
                aria-label="height"
              />
              <ErrorMessage name="height">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.step_one_form_group}>
              <Field
                className={styles.form_step_one_input}
                type="text"
                name="currentWeight"
                placeholder="Current Weight"
                aria-label="Current Weight"
              />
              <ErrorMessage name="currentWeight">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.step_one_form_group}>
              <div className={styles.show_password_wrapper}>
                <Field
                  className={styles.form_step_one_input}
                  type="text"
                  name="desiredWeight"
                  placeholder="Desired Weight"
                  aria-label="Desired Weight"
                />
              </div>
              <ErrorMessage name="desiredWeight">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.step_one_form_group}>
              <div className={styles.show_password_wrapper}>
                <Field
                  className={styles.form_step_one_input}
                  type="text"
                  name="birthday"
                  placeholder="Birthday"
                  aria-label="birthday"
                />
              </div>
              <ErrorMessage name="birthday">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <Link
              href="/user-data/step-two"
              onClick={handleSaveValuesToGlobalState}
            >
              <span>Next </span>
              <Image src="/next.svg" alt="" width={20} height={20} />
            </Link>
          </Form>
        </Formik>
      </Container>
    </section>
  );
};

export default DataUserStepOne;
