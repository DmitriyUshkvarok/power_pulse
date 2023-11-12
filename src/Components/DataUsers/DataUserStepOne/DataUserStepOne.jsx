'use client';
import styles from './_DataUserStepOne.module.scss';
import Container from '../../Container/Container';
import * as yup from 'yup';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import Link from 'next/link';
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const initialValues = {
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
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleCalendarToggle = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const handleSubmit = (values) => {
    console.log(values);
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
                // placeholder="Height"
                aria-label="height"
              />
              <span className={styles.step_one_form_placeholder}>Height</span>
              <ErrorMessage name="height">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.step_one_form_group}>
              <Field
                className={styles.form_step_one_input}
                type="text"
                name="currentWeight"
                // placeholder="Current Weight"
                aria-label="Current Weight"
              />
              <span className={styles.step_one_form_placeholder}>
                Current Weight
              </span>
              <ErrorMessage name="currentWeight">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.step_one_form_group}>
              <Field
                className={styles.form_step_one_input}
                type="text"
                name="desiredWeight"
                // placeholder="Desired Weight"
                aria-label="Desired Weight"
              />
              <span className={styles.step_one_form_placeholder}>
                Desired Weight
              </span>
              <ErrorMessage name="desiredWeight">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.step_one_form_group}>
              <Field
                className={styles.form_step_one_input}
                type="text"
                name="birthday"
                // placeholder="Birthday"
                aria-label="birthday"
              />
              <span className={styles.step_one_form_placeholder}>Birthday</span>
              <Image
                src="/calendar.svg"
                alt="calendar icon"
                width={18}
                height={18}
                className={styles.calendar_icon}
                onClick={handleCalendarToggle}
              />
              {isCalendarOpen && (
                <div className={styles.calendarContainer}>
                  <Calendar
                    className={styles.customCalendar}
                    onChange={setDate}
                    value={date}
                  />
                </div>
              )}
              <ErrorMessage name="birthday">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
          </Form>
        </Formik>
        <Link
          href="/user-data/step-two"
          onClick={handleSaveValuesToGlobalState}
          className={styles.link_next}
        >
          <span>Next </span>
          <Image src="/next.svg" alt="" width={20} height={20} />
        </Link>
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
          <Link href="/user-data" className={styles.nav_pagination_link}></Link>
          <Link
            href="/user-data/step-two"
            className={styles.nav_pagination_link}
          ></Link>
          <Link
            href="/user-data/step-three"
            className={styles.nav_pagination_link}
          ></Link>
        </div>
      </Container>
    </section>
  );
};

export default DataUserStepOne;
