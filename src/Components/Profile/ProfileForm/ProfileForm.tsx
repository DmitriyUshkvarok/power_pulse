'use client';
import 'react-calendar/dist/Calendar.css';
import styles from './_ProfileForm.module.scss';
import Image from 'next/image';
import CalendarComponent from '../../UI/Calendar/Calendar';
import DynamicForm from '../../UI/DynamicForm/DynamicForm';
import Button from '../../UI/Buttons/ButtonSubmit/Button';
import InputField from '../../UI/InputField/InputField';
import useUserSession from '@/src/hooks/useUserSession';
import { useState, useEffect } from 'react';
import { ProfileFormValues } from './types';
import { profilesShema } from '@/src/validation/profileFormSchema';
import { fetchUserData } from '@/src/redux/userData/userDataSlice';
import { updateUserNameAndEmail } from '@/src/app/actions/authActions';
import { updateUserData } from '@/src/app/actions/userDataActions';
import { useRouter } from 'next/navigation';
import { createDataAsync } from '@/src/redux/userData/userDataSlice';
import { formatDate } from '@/src/utils/formatDate';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';

const ProfileForm = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const userData = useAppSelector((state) => state.userData.data);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userDataId, userId, update, session } = useUserSession();
  const dispatch = useAppDispatch();

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
    birthday: userData?.birthday ?? '',
    bloodGroup: userData?.bloodGroup ?? '',
    sex: userData?.sex ?? '',
    levelActivity: userData?.levelActivity ?? '',
  };

  const handleCalendarToggle = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const handleSave = async (values: ProfileFormValues) => {
    if (date instanceof Date) {
      const formatDateToString = formatDate(date);
      const updatedValues = { ...values, birthday: formatDateToString };

      try {
        setLoading(true);
        const { name, email } = updatedValues;
        await updateUserNameAndEmail({ name, email });
        // update({ name: name, image: session?.user?.image });
        await updateUserData(userDataId, updatedValues);
        await dispatch(createDataAsync({ id: userId, data: values }));
        if (email !== session?.user?.email) {
          router.push('/signin');
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <DynamicForm
      initialValues={initialValues}
      validationSchema={profilesShema}
      onSubmit={handleSave}
      enableReinitialize={true}
    >
      {(formikProps) => (
        <div className={styles.form_profile}>
          <div className={styles.form_block_one}>
            <div className={styles.profile_form_group_one}>
              <InputField
                errorClassName={styles.validation_error}
                className={styles.form_profile_input_one}
                classNameErrorIcon={styles.form_profile_input_error_icon}
                type="text"
                name="name"
                aria-label="name"
                id="name"
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
            </div>
            <div className={styles.profile_form_group_one}>
              <InputField
                errorClassName={styles.validation_error}
                classNameErrorIcon={styles.form_profile_input_error_icon}
                className={styles.form_profile_input_one}
                type="email"
                name="email"
                aria-label="email"
                id="email"
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
            </div>
          </div>
          <div className={styles.form_block_two}>
            <div className={styles.profile_form_group_two}>
              <InputField
                errorClassName={styles.validation_error_two}
                className={styles.form_profile_input_two}
                classNameErrorIcon={styles.form_profile_input_error_icon}
                type="text"
                name="height"
                aria-label="height"
                id="height"
              />
              {!formikProps.values.height && (
                <span className={styles.span_one_form_placeholder}>Height</span>
              )}
            </div>
            <div className={styles.profile_form_group_two}>
              <InputField
                errorClassName={styles.validation_error_two}
                classNameErrorIcon={styles.form_profile_input_error_icon}
                className={styles.form_profile_input_two}
                type="text"
                name="currentWeight"
                aria-label="Current Weight"
                id="Current Weight"
              />
              {!formikProps.values.currentWeight && (
                <span className={styles.span_one_form_placeholder}>
                  Current Weight
                </span>
              )}
            </div>
            <div className={styles.profile_form_group_two}>
              <InputField
                errorClassName={styles.validation_error_two}
                classNameErrorIcon={styles.form_profile_input_error_icon}
                className={styles.form_profile_input_two}
                type="text"
                name="desiredWeight"
                aria-label="Desired Weight"
                id="Desired Weight"
              />
              {!formikProps.values.desiredWeight && (
                <span className={styles.span_one_form_placeholder}>
                  Desired Weight
                </span>
              )}
            </div>
            <div className={styles.profile_form_group_two}>
              <InputField
                errorClassName={styles.validation_error_two}
                classNameErrorIcon={styles.form_profile_input_error_icon}
                className={styles.form_profile_input_two}
                type="text"
                name="birthday"
                aria-label="birthday"
                id="birthday"
              />
              {!formikProps.values.birthday && (
                <span className={styles.span_one_form_placeholder}>
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
              <CalendarComponent
                isCalendarOpen={isCalendarOpen}
                date={date}
                setDate={setDate}
                handleCalendarToggle={handleCalendarToggle}
                setFieldValue={formikProps.setFieldValue}
              />
            </div>
          </div>
          <label className={styles.label_radio}>Blood:</label>
          <div className={styles.profile_form_group_sex_and_blood_group}>
            <div className={styles.form_block_three}>
              <div className={styles.profile_form_group_three}>
                <InputField
                  errorClassName={styles.validation_error}
                  className={styles.radio_btn}
                  type="radio"
                  name="bloodGroup"
                  value="1"
                  id="bloodGroup1"
                />
                <span className={styles.radio_text}>1</span>
              </div>

              <div className={styles.profile_form_group_three}>
                <InputField
                  errorClassName={styles.validation_error}
                  className={styles.radio_btn}
                  type="radio"
                  name="bloodGroup"
                  value="2"
                  id="bloodGroup2"
                />
                <span className={styles.radio_text}>2</span>
              </div>
              <div className={styles.profile_form_group_three}>
                <InputField
                  errorClassName={styles.validation_error}
                  className={styles.radio_btn}
                  type="radio"
                  name="bloodGroup"
                  value="3"
                  id="bloodGroup3"
                />
                <span className={styles.radio_text}>3</span>
              </div>
              <div className={styles.profile_form_group_three}>
                <InputField
                  errorClassName={styles.validation_error}
                  className={styles.radio_btn}
                  type="radio"
                  name="bloodGroup"
                  value="4"
                  id="bloodGroup4"
                />
                <span className={styles.radio_text}>4</span>
              </div>
            </div>
            <div className={styles.form_block_four}>
              <div className={styles.profile_form_group_four}>
                <InputField
                  errorClassName={styles.validation_error}
                  className={styles.radio_btn}
                  type="radio"
                  name="sex"
                  value="Male"
                  id="Male"
                />
                <span className={styles.radio_text}>Male</span>
              </div>
              <div className={styles.profile_form_group_four}>
                <InputField
                  errorClassName={styles.validation_error}
                  className={styles.radio_btn}
                  type="radio"
                  name="sex"
                  value="Female"
                  id="Female"
                />
                <span className={styles.radio_text}>Female</span>
              </div>
            </div>
          </div>
          <div className={styles.form_group_five}>
            <div className={styles.profile_form_group_five}>
              <InputField
                errorClassName={styles.validation_error}
                className={styles.radio_btn_five}
                type="radio"
                name="levelActivity"
                value="Sedentary lifestyle"
                id="levelActivity"
              />
              <span className={styles.radio_text}>
                Sedentary lifestyle (little or no physical activity)
              </span>
            </div>
            <div className={styles.profile_form_group_five}>
              <InputField
                errorClassName={styles.validation_error}
                className={styles.radio_btn_five}
                type="radio"
                name="levelActivity"
                value="Light activity"
                id="levelActivity2"
              />
              <span className={styles.radio_text}>
                Light activity (light exercises/sports 1-3 days per week)
              </span>
            </div>
            <div className={styles.profile_form_group_five}>
              <InputField
                errorClassName={styles.validation_error}
                className={styles.radio_btn_five}
                type="radio"
                name="levelActivity"
                value="Moderately active"
                id="levelActivity3"
              />
              <span className={styles.radio_text}>
                Moderately active (moderate exercises/sports 3-5 days per week)
              </span>
            </div>
            <div className={styles.profile_form_group_five}>
              <InputField
                errorClassName={styles.validation_error}
                className={styles.radio_btn_five}
                type="radio"
                name="levelActivity"
                value="Very active"
                id="levelActivity4"
              />
              <span className={styles.radio_text}>
                Very active (intense exercises/sports 6-7 days per week)
              </span>
            </div>
            <div className={styles.profile_form_group_five}>
              <InputField
                errorClassName={styles.validation_error}
                className={styles.radio_btn_five}
                type="radio"
                name="levelActivity"
                value="Extremely active"
                id="levelActivity5"
              />
              <span className={styles.radio_text}>
                Extremely active (very strenuous exercises/sports and physical
                work)
              </span>
            </div>
          </div>
          <Button
            className={styles.btn_save}
            type="submit"
            disabled={!formikProps.isValid}
          >
            {loading ? 'Loading...' : 'Save'}
          </Button>
          {!formikProps.isValid && (
            <p className={styles.errorText}>
              Please fill in all the required fields.
            </p>
          )}
        </div>
      )}
    </DynamicForm>
  );
};

export default ProfileForm;
