'use client';
import styles from './_DataUserStepOne.module.scss';
import Container from '../../Container/Container';
import Image from 'next/image';
import CalendarComponent from '../../UI/Calendar/Calendar';
import DataUserNavigationList from '../DataUserNavigationList/DataUserNavigationList';
import DataUserBanner from '../DataUserBanner/DataUserBanner';
import useRouterPush from '@/src/hooks/useRouter';
import { useState, useRef } from 'react';
import { updateUserData } from '@/src/redux/userData/userDataSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { dataStepOneSchema } from '@/src/validation/dataStepOneSchema';
import { formatDate } from '@/src/utils/formatDate';
import { useAppDispatch } from '@/src/hooks/redux-hook';

interface FormData {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
}

const initialValues = {
  height: '',
  currentWeight: '',
  desiredWeight: '',
  birthday: '',
};

const DataUserStepOne = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useAppDispatch();
  const { pushRoute } = useRouterPush();
  const formikRef = useRef(null);

  const handleCalendarToggle = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const handleSaveValuesToGlobalState = (values: FormData) => {
    const formatDateToString = formatDate(date);
    const updatedValues = { ...values, birthday: formatDateToString };
    dispatch(updateUserData(updatedValues));
    pushRoute('/user-data/step-two');
  };

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
          validationSchema={dataStepOneSchema}
          onSubmit={handleSaveValuesToGlobalState}
          innerRef={formikRef}
        >
          {({ isValid, touched, errors, setFieldValue, values }) => (
            <Form className={styles.form_step_one}>
              <div className={styles.step_one_form_group}>
                <Field
                  className={styles.form_step_one_input}
                  type="text"
                  name="height"
                  aria-label="height"
                />
                {!values.height && (
                  <span className={styles.step_one_form_placeholder}>
                    Height
                  </span>
                )}
                {touched.height && !errors.height && (
                  <div className={styles.success_text}>
                    <div>
                      <Image
                        src="/success.svg"
                        alt="success icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span>success height</span>
                  </div>
                )}
                <ErrorMessage name="height">
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
              <div className={styles.step_one_form_group}>
                <Field
                  className={styles.form_step_one_input}
                  type="text"
                  name="currentWeight"
                  aria-label="Current Weight"
                />
                {!values.currentWeight && (
                  <span className={styles.step_one_form_placeholder}>
                    Current Weight
                  </span>
                )}
                {touched.currentWeight && !errors.currentWeight && (
                  <div className={styles.success_text}>
                    <div>
                      <Image
                        src="/success.svg"
                        alt="success icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span>success current weight</span>
                  </div>
                )}
                <ErrorMessage name="currentWeight">
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
              <div className={styles.step_one_form_group}>
                <Field
                  className={styles.form_step_one_input}
                  type="text"
                  name="desiredWeight"
                  aria-label="Desired Weight"
                />
                {!values.desiredWeight && (
                  <span className={styles.step_one_form_placeholder}>
                    Desired Weight
                  </span>
                )}
                {touched.desiredWeight && !errors.desiredWeight && (
                  <div className={styles.success_text}>
                    <div>
                      <Image
                        src="/success.svg"
                        alt="success icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span>success desired weight</span>
                  </div>
                )}
                <ErrorMessage name="desiredWeight">
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
              <div className={styles.step_one_form_group}>
                <Field
                  className={styles.form_step_one_input}
                  type="text"
                  name="birthday"
                  aria-label="birthday"
                />
                {!values.birthday && (
                  <span className={styles.step_one_form_placeholder}>
                    Birthday
                  </span>
                )}
                <Image
                  src="/calendar.svg"
                  alt="calendar icon"
                  width={18}
                  height={18}
                  className={styles.calendar_icon}
                  onClick={handleCalendarToggle}
                />
                {touched.birthday && !errors.birthday && (
                  <div className={styles.success_text}>
                    <div>
                      <Image
                        src="/success.svg"
                        alt="success icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span>success birthday</span>
                  </div>
                )}
                <ErrorMessage name="birthday">
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
              <button
                className={styles.link_next}
                type="submit"
                disabled={!isValid}
              >
                <span>Next </span>
                <Image src="/next.svg" alt="" width={20} height={20} />
                {!isValid && (
                  <p className={styles.errorText}>
                    Please fill in all the required fields.
                  </p>
                )}
              </button>
              <CalendarComponent
                isCalendarOpen={isCalendarOpen}
                date={date}
                setDate={setDate}
                handleCalendarToggle={handleCalendarToggle}
                setFieldValue={setFieldValue}
              />
            </Form>
          )}
        </Formik>
        <DataUserBanner />
        <DataUserNavigationList />
      </Container>
    </section>
  );
};

export default DataUserStepOne;
