'use client';
import styles from './_ProfileForm.module.scss';
import { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/redux/store';
import { useSession } from 'next-auth/react';
import { ProfileFormValues, UserSession, UserDataId } from './index';
import { profilesShema } from '@/src/formSchemas/profileFormSchema';
import { fetchUserData } from '@/src/redux/userData/userDataSlice';
import { AppDispatch } from '@/src/redux/store';

const ProfileForm = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const formikRef = useRef(null);
  const userData = useSelector((state: RootState) => state.userData.data);

  const { data: session } = useSession();
  const userDataId = (session?.user as UserSession)?.userData;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getUserDataByIdClient = async () => {
      try {
        await dispatch(fetchUserData(userDataId));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserDataByIdClient();
  }, [dispatch, userDataId]);

  const initialValues = {
    name: session?.user?.name ?? '',
    email: session?.user?.email ?? '',
    height: userData?.height ?? '',
    currentWeight: userData?.currentWeight ?? '',
    desiredWeight: userData?.desiredWeight ?? '',
    birthday: userData?.birthday.slice(0, 10) ?? '',
    bloodGroup: userData?.bloodGroup ?? '',
    sex: userData?.sex ?? '',
    levelActivity: userData?.levelActivity ?? '',
  };

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
        validationSchema={profilesShema}
        onSubmit={handleSave}
        innerRef={formikRef}
        enableReinitialize={true}
      >
        {({ isValid, setFieldValue }) => (
          <Form className={styles.form_profile}>
            <div className={styles.form_block_one}>
              <div className={styles.profile_form_group_one}>
                <Field
                  className={styles.form_profile_input_one}
                  type="text"
                  name="name"
                  aria-label="name"
                />
                <span
                  className={
                    session?.user?.name
                      ? styles.form_placeholder_hidden
                      : styles.span_one_form_placeholder
                  }
                >
                  Name
                </span>
                <ErrorMessage name="name">
                  {(msg) => (
                    <div className={styles.validation_error}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className={styles.profile_form_group_one}>
                <Field
                  className={styles.form_profile_input_one}
                  type="email"
                  name="email"
                  aria-label="email"
                />
                <span
                  className={
                    session?.user?.email
                      ? styles.form_placeholder_hidden
                      : styles.span_one_form_placeholder
                  }
                >
                  Email
                </span>
                <ErrorMessage name="email">
                  {(msg) => (
                    <div className={styles.validation_error}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>
            </div>
            <div className={styles.form_block_two}>
              <div className={styles.profile_form_group_two}>
                <Field
                  className={styles.form_profile_input_two}
                  type="text"
                  name="height"
                  aria-label="height"
                />
                <span
                  className={
                    userData?.height
                      ? styles.form_placeholder_hidden
                      : styles.span_one_form_placeholder
                  }
                >
                  Height
                </span>
                <ErrorMessage name="height">
                  {(msg) => (
                    <div className={styles.validation_error_two}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className={styles.profile_form_group_two}>
                <Field
                  className={styles.form_profile_input_two}
                  type="text"
                  name="currentWeight"
                  aria-label="Current Weight"
                />
                <span
                  className={
                    userData?.currentWeight
                      ? styles.form_placeholder_hidden
                      : styles.span_one_form_placeholder
                  }
                >
                  Current Weight
                </span>
                <ErrorMessage name="currentWeight">
                  {(msg) => (
                    <div className={styles.validation_error_two}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className={styles.profile_form_group_two}>
                <Field
                  className={styles.form_profile_input_two}
                  type="text"
                  name="desiredWeight"
                  aria-label="Desired Weight"
                />
                <span
                  className={
                    userData?.desiredWeight
                      ? styles.form_placeholder_hidden
                      : styles.span_one_form_placeholder
                  }
                >
                  Desired Weight
                </span>
                <ErrorMessage name="desiredWeight">
                  {(msg) => (
                    <div className={styles.validation_error_two}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className={styles.profile_form_group_two}>
                <Field
                  className={styles.form_profile_input_two}
                  type="text"
                  name="birthday"
                  aria-label="birthday"
                />
                <span
                  className={
                    userData?.birthday
                      ? styles.form_placeholder_hidden
                      : styles.span_one_form_placeholder
                  }
                >
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
                  {(msg) => (
                    <div className={styles.validation_error_two}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>
            </div>
            <label className={styles.label_radio}>Blood:</label>
            <div className={styles.profile_form_group_sex_and_blood_group}>
              <div className={styles.form_block_three}>
                <div className={styles.profile_form_group_three}>
                  <Field
                    className={styles.radio_btn}
                    type="radio"
                    name="bloodGroup"
                    value="1"
                  />
                  <span className={styles.radio_text}>1</span>
                </div>

                <div className={styles.profile_form_group_three}>
                  <Field
                    className={styles.radio_btn}
                    type="radio"
                    name="bloodGroup"
                    value="2"
                  />
                  <span className={styles.radio_text}>2</span>
                </div>
                <div className={styles.profile_form_group_three}>
                  <Field
                    className={styles.radio_btn}
                    type="radio"
                    name="bloodGroup"
                    value="3"
                  />
                  <span className={styles.radio_text}>3</span>
                </div>
                <div className={styles.profile_form_group_three}>
                  <Field
                    className={styles.radio_btn}
                    type="radio"
                    name="bloodGroup"
                    value="4"
                  />
                  <span className={styles.radio_text}>4</span>
                </div>
              </div>
              <div className={styles.form_block_four}>
                <div className={styles.profile_form_group_four}>
                  <Field
                    className={styles.radio_btn}
                    type="radio"
                    name="sex"
                    value="Male"
                  />
                  <span className={styles.radio_text}>Male</span>
                </div>
                <div className={styles.profile_form_group_four}>
                  <Field
                    className={styles.radio_btn}
                    type="radio"
                    name="sex"
                    value="Female"
                  />
                  <span className={styles.radio_text}>Female</span>
                </div>
              </div>
            </div>
            <div className={styles.form_group_five}>
              <div className={styles.profile_form_group_five}>
                <Field
                  className={styles.radio_btn_five}
                  type="radio"
                  name="levelActivity"
                  value="Sedentary lifestyle"
                />
                <span className={styles.radio_text}>
                  Sedentary lifestyle (little or no physical activity)
                </span>
              </div>
              <div className={styles.profile_form_group_five}>
                <Field
                  className={styles.radio_btn_five}
                  type="radio"
                  name="levelActivity"
                  value="Light activity"
                />
                <span className={styles.radio_text}>
                  Light activity (light exercises/sports 1-3 days per week)
                </span>
              </div>
              <div className={styles.profile_form_group_five}>
                <Field
                  className={styles.radio_btn_five}
                  type="radio"
                  name="levelActivity"
                  value="Moderately active"
                />
                <span className={styles.radio_text}>
                  Moderately active (moderate exercises/sports 3-5 days per
                  week)
                </span>
              </div>
              <div className={styles.profile_form_group_five}>
                <Field
                  className={styles.radio_btn_five}
                  type="radio"
                  name="levelActivity"
                  value="Very active"
                />
                <span className={styles.radio_text}>
                  Very active (intense exercises/sports 6-7 days per week)
                </span>
              </div>
              <div className={styles.profile_form_group_five}>
                <Field
                  className={styles.radio_btn_five}
                  type="radio"
                  name="levelActivity"
                  value="Extremely active"
                />
                <span className={styles.radio_text}>
                  Extremely active (very strenuous exercises/sports and physical
                  work)
                </span>
              </div>
            </div>
            <button
              className={styles.btn_save}
              type="submit"
              disabled={!isValid}
            >
              <span>Save </span>
            </button>
            {!isValid && (
              <p className={styles.errorText}>
                Please fill in all the required fields.
              </p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfileForm;
