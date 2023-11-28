'use client';
import styles from './_DataUserStepOne.module.scss';
import Container from '../../Container/Container';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserData } from '@/src/redux/userData/userDataSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';
import { dataStepOneSchema } from '@/src/formSchemas/dataStepOneSchema';

const initialValues = {
  height: '',
  currentWeight: '',
  desiredWeight: '',
  birthday: '',
};

const DataUserStepOne = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const router = useRouter();
  const formikRef = useRef(null);

  const handleCalendarToggle = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const clickBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      setCalendarOpen(false);
    }
  };

  const handleSaveValuesToGlobalState = (values) => {
    const isoDateString = date.toISOString();
    const updatedValues = { ...values, birthday: isoDateString };
    dispatch(updateUserData(updatedValues));
    router.push('/user-data/step-two');
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
          {({ isValid, touched, errors, setFieldValue }) => (
            <Form className={styles.form_step_one}>
              <div className={styles.step_one_form_group}>
                <Field
                  className={styles.form_step_one_input}
                  type="text"
                  name="height"
                  aria-label="height"
                />
                <span className={styles.step_one_form_placeholder}>Height</span>
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
                <span className={styles.step_one_form_placeholder}>
                  Current Weight
                </span>
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
                <span className={styles.step_one_form_placeholder}>
                  Desired Weight
                </span>
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
                <span className={styles.step_one_form_placeholder}>
                  Birthday
                </span>
                <Image
                  src="/calendar.svg"
                  alt="calendar icon"
                  width={18}
                  height={18}
                  className={styles.calendar_icon}
                  onClick={handleCalendarToggle}
                />
                {isCalendarOpen && (
                  <div
                    className={styles.calendar_backdrop}
                    onClick={clickBackdrop}
                  >
                    <div className={styles.calendarContainer}>
                      <Calendar
                        className={styles.customCalendar}
                        onChange={(selectedDate) => {
                          setFieldValue(
                            'birthday',
                            selectedDate.toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'numeric',
                              year: 'numeric',
                            })
                          );
                          setDate(selectedDate);
                        }}
                        value={date}
                      />
                    </div>
                  </div>
                )}
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
            </Form>
          )}
        </Formik>
        <div className={styles.video_tutorial_banner}>
          <div className={styles.video_tutorial_banner_icon}>
            <Image
              src={'/video-icon.svg'}
              alt="header logo"
              width={9}
              height={9}
            />
          </div>
          <div className={styles.video_tutorial_text_wrapper}>
            <div className={styles.video_tutorial_title}>350+</div>
            <div className={styles.video_description}>Video tutorial</div>
          </div>
        </div>
        <div className={styles.cal_banner}>
          <div className={styles.cal_banner_icon}>
            <Image
              src={'/cal-man-icon.svg'}
              alt="header logo"
              width={12}
              height={12}
            />
          </div>
          <div className={styles.cal_banner_text_wrapper}>
            <div className={styles.cal_banner_title}>500</div>
            <div className={styles.cal_banner_description}>cal</div>
          </div>
        </div>
        <div className={styles.nav_pagination}>
          <Link
            href="/user-data"
            className={styles.nav_pagination_link}
            onClick={(e) => {
              if (!formikRef.current.isValid) {
                e.preventDefault();
              }
            }}
          ></Link>
          <Link
            href="/user-data/step-two"
            className={styles.nav_pagination_link}
            onClick={(e) => {
              if (!formikRef.current.isValid) {
                e.preventDefault();
              }
            }}
          ></Link>
          <Link
            href="/user-data/step-three"
            className={styles.nav_pagination_link}
            onClick={(e) => {
              if (!formikRef.current.isValid) {
                e.preventDefault();
              }
            }}
          ></Link>
        </div>
      </Container>
    </section>
  );
};

export default DataUserStepOne;
