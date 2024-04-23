'use client';
import styles from './_DataUserStepOne.module.scss';
import Container from '../../Container/Container';
import Image from 'next/image';
import CalendarComponent from '../../UI/Calendar/Calendar';
import DataUserNavigationList from '../DataUserNavigationList/DataUserNavigationList';
import DataUserBanner from '../DataUserBanner/DataUserBanner';
import DynamicForm from '../../UI/DynamicForm/DynamicForm';
import useRouterPush from '@/src/hooks/useRouter';
import Button from '../../UI/Buttons/ButtonSubmit/Button';
import InputField from '../../UI/InputField/InputField';
import { useState } from 'react';
import { updateUserData } from '@/src/redux/userData/userDataSlice';
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
        <DynamicForm
          initialValues={initialValues}
          validationSchema={dataStepOneSchema}
          onSubmit={handleSaveValuesToGlobalState}
        >
          {(formikProps) => (
            <div className={styles.form_step_one}>
              <div className={styles.step_one_form_group}>
                <InputField
                  errorClassName={styles.validation_error}
                  className={styles.form_step_one_input}
                  type="text"
                  name="height"
                  aria-label="height"
                />
                {!formikProps.values.height && (
                  <span className={styles.step_one_form_placeholder}>
                    Height
                  </span>
                )}
                {formikProps.touched.height && !formikProps.errors.height && (
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
              </div>
              <div className={styles.step_one_form_group}>
                <InputField
                  errorClassName={styles.validation_error}
                  className={styles.form_step_one_input}
                  type="text"
                  name="currentWeight"
                  aria-label="Current Weight"
                />
                {!formikProps.values.currentWeight && (
                  <span className={styles.step_one_form_placeholder}>
                    Current Weight
                  </span>
                )}
                {formikProps.touched.currentWeight &&
                  !formikProps.errors.currentWeight && (
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
              </div>
              <div className={styles.step_one_form_group}>
                <InputField
                  errorClassName={styles.validation_error}
                  className={styles.form_step_one_input}
                  type="text"
                  name="desiredWeight"
                  aria-label="Desired Weight"
                />
                {!formikProps.values.desiredWeight && (
                  <span className={styles.step_one_form_placeholder}>
                    Desired Weight
                  </span>
                )}
                {formikProps.touched.desiredWeight &&
                  !formikProps.errors.desiredWeight && (
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
              </div>
              <div className={styles.step_one_form_group}>
                <InputField
                  errorClassName={styles.validation_error}
                  className={styles.form_step_one_input}
                  type="text"
                  name="birthday"
                  aria-label="birthday"
                />
                {!formikProps.values.birthday && (
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
                {formikProps.touched.birthday &&
                  !formikProps.errors.birthday && (
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
              </div>
              <Button
                className={styles.link_next}
                type="submit"
                disabled={!formikProps.isValid}
              >
                <span>Next </span>
                <Image src="/next.svg" alt="" width={20} height={20} />
                {!formikProps.isValid && (
                  <p className={styles.errorText}>
                    Please fill in all the required fields.
                  </p>
                )}
              </Button>
              <CalendarComponent
                isCalendarOpen={isCalendarOpen}
                date={date}
                setDate={setDate}
                handleCalendarToggle={handleCalendarToggle}
                setFieldValue={formikProps.setFieldValue}
              />
            </div>
          )}
        </DynamicForm>
        <DataUserBanner />
        <DataUserNavigationList />
      </Container>
    </section>
  );
};

export default DataUserStepOne;
