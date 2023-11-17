'use client';
import styles from './_ProfileForm.module.scss';
import * as yup from 'yup';
import { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface ProfileFormValues {
  name: string;
  email: string;
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
  bloodGroup: string;
  sex: string;
  levelActivity: string;
}

const initialValues = {
  name: '',
  email: '',
  height: '',
  currentWeight: '',
  desiredWeight: '',
  birthday: '',
  bloodGroup: '',
  sex: '',
  levelActivity: '',
};

const schema = yup.object().shape({
  name: yup.string().required(),
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
  height: yup.string().required('Height is required'),
  currentWeight: yup.string().required('Current Weight is required'),
  desiredWeight: yup.string().required('Desired Weight is required'),
  birthday: yup.string().required('Birthday is required'),
  bloodGroup: yup.string().required('Blood Group is required'),
  sex: yup.string().required('Sex is required'),
  levelActivity: yup.string().required('Level of Activity is required'),
});

const ProfileForm = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const formikRef = useRef(null);

  const handleCalendarToggle = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const clickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setCalendarOpen(false);
    }
  };

  const handleSave = (values: ProfileFormValues) => {
    if (date instanceof Date) {
      const isoDateString = date.toISOString();
      const updatedValues = { ...values, birthday: isoDateString };
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSave}
        innerRef={formikRef}
      >
        {({ isValid, setFieldValue }) => (
          <Form className={styles.form_step_one}>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.form_step_one_input}
                type="text"
                name="height"
                aria-label="height"
              />
              <span className={styles.step_one_form_placeholder}>Height</span>
              <ErrorMessage name="height">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.form_step_one_input}
                type="text"
                name="currentWeight"
                aria-label="Current Weight"
              />
              <span className={styles.step_one_form_placeholder}>
                Current Weight
              </span>
              <ErrorMessage name="currentWeight">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.form_step_one_input}
                type="text"
                name="desiredWeight"
                aria-label="Desired Weight"
              />
              <span className={styles.step_one_form_placeholder}>
                Desired Weight
              </span>
              <ErrorMessage name="desiredWeight">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.form_step_one_input}
                type="text"
                name="birthday"
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
                <div
                  className={styles.calendar_backdrop}
                  onClick={clickBackdrop}
                >
                  <div className={styles.calendarContainer}>
                    <Calendar
                      className={styles.customCalendar}
                      onChange={(selectedDate) => {
                        if (selectedDate instanceof Date) {
                          setFieldValue(
                            'birthday',
                            selectedDate.toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'numeric',
                              year: 'numeric',
                            })
                          );
                          setDate(selectedDate);
                        }
                      }}
                      value={date}
                    />
                  </div>
                </div>
              )}
              <ErrorMessage name="birthday">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>
            <div className={styles.profile_form_group}>
              <label className={styles.label_radio}>Blood:</label>
              <div className={styles.form_group_text_and_btn}>
                <Field
                  className={styles.radio_btn}
                  type="radio"
                  name="bloodGroup"
                  value="A"
                />
                <span className={styles.radio_text}>1</span>
              </div>
              <div className={styles.profile_form_group}>
                <Field
                  className={styles.radio_btn}
                  type="radio"
                  name="bloodGroup"
                  value="B"
                />
                <span className={styles.radio_text}>2</span>
              </div>
              <div className={styles.profile_form_group}>
                <Field
                  className={styles.radio_btn}
                  type="radio"
                  name="bloodGroup"
                  value="AB"
                />
                <span className={styles.radio_text}>3</span>
              </div>
              <div className={styles.profile_form_group}>
                <Field
                  className={styles.radio_btn}
                  type="radio"
                  name="bloodGroup"
                  value="O"
                />
                <span className={styles.radio_text}>4</span>
              </div>
              <ErrorMessage name="bloodGroup">
                {(msg) => <div className={styles.validation_error}>{msg}</div>}
              </ErrorMessage>
            </div>

            <label className={styles.label_radio}>Sex:</label>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.radio_btn}
                type="radio"
                name="sex"
                value="Male"
              />
              <span className={styles.radio_text}>Male</span>
            </div>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.radio_btn}
                type="radio"
                name="sex"
                value="Female"
              />
              <span className={styles.radio_text}>Female</span>
            </div>
            <ErrorMessage name="sex">
              {(msg) => <div className={styles.validation_error}>{msg}</div>}
            </ErrorMessage>
            <label className={styles.label_radio}>Level of Activity:</label>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.radio_btn}
                type="radio"
                name="levelActivity"
                value="Sedentary lifestyle"
              />
              <span className={styles.radio_text}>
                Sedentary lifestyle (little or no physical activity)
              </span>
            </div>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.radio_btn}
                type="radio"
                name="levelActivity"
                value="Light activity"
              />
              <span className={styles.radio_text}>
                Light activity (light exercises/sports 1-3 days per week)
              </span>
            </div>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.radio_btn}
                type="radio"
                name="levelActivity"
                value="Moderately active"
              />
              <span className={styles.radio_text}>
                Moderately active (moderate exercises/sports 3-5 days per week)
              </span>
            </div>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.radio_btn}
                type="radio"
                name="levelActivity"
                value="Very active"
              />
              <span className={styles.radio_text}>
                Very active (intense exercises/sports 6-7 days per week)
              </span>
            </div>
            <div className={styles.profile_form_group}>
              <Field
                className={styles.radio_btn}
                type="radio"
                name="levelActivity"
                value="Extremely active"
              />
              <span className={styles.radio_text}>
                Extremely active (very strenuous exercises/sports and physical
                work)
              </span>
            </div>
            <ErrorMessage name="levelActivity">
              {(msg) => <div className={styles.validation_error}>{msg}</div>}
            </ErrorMessage>
            <button
              className={styles.link_next}
              type="submit"
              disabled={!isValid}
            >
              <span>Save </span>
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfileForm;
