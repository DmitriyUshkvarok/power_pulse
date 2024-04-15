'use client';
import styles from './_DataUserStepTwo.module.scss';
import Container from '../../Container/Container';
import Link from 'next/link';
import Image from 'next/image';
import useRouterPush from '@/src/hooks/useRouter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UserData } from './index';
import { dataStepTwoSchema } from '@/src/validation/dataStepTwoSchema';
import { useAppDispatch } from '@/src/hooks/redux-hook';
import {
  updateUserData,
  resetUserData,
} from '@/src/redux/userData/userDataSlice';

const initialValues = {
  bloodGroup: '',
  sex: '',
  levelActivity: '',
};

const DataUserStepTwo = () => {
  const dispatch = useAppDispatch();
  const { pushRoute } = useRouterPush();

  const handleSaveValuesToGlobalState = (values: UserData) => {
    dispatch(updateUserData(values));
    pushRoute('/user-data/step-three');
  };

  const handleRemoveState = () => {
    dispatch(resetUserData());
  };
  return (
    <section className={styles.step_two_section}>
      <Container>
        <h1 className={styles.step_two_title}>Get closer to your goals!</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={dataStepTwoSchema}
          onSubmit={handleSaveValuesToGlobalState}
        >
          {({ isValid }) => (
            <Form className={styles.form_step_two}>
              <div className={styles.top_group_wrapper}>
                <div className={styles.form_group}>
                  <label className={styles.label_radio}>Blood:</label>
                  <div className={styles.form_group_text_and_btn}>
                    <Field
                      className={styles.radio_btn}
                      type="radio"
                      name="bloodGroup"
                      value="1"
                    />
                    <span className={styles.radio_text}>1</span>
                  </div>
                  <div className={styles.form_group_text_and_btn}>
                    <Field
                      className={styles.radio_btn}
                      type="radio"
                      name="bloodGroup"
                      value="2"
                    />
                    <span className={styles.radio_text}>2</span>
                  </div>
                  <div className={styles.form_group_text_and_btn}>
                    <Field
                      className={styles.radio_btn}
                      type="radio"
                      name="bloodGroup"
                      value="3"
                    />
                    <span className={styles.radio_text}>3</span>
                  </div>
                  <div className={styles.form_group_text_and_btn}>
                    <Field
                      className={styles.radio_btn}
                      type="radio"
                      name="bloodGroup"
                      value="4"
                    />
                    <span className={styles.radio_text}>4</span>
                  </div>
                  <ErrorMessage name="bloodGroup">
                    {(msg) => (
                      <div className={styles.validation_error}>{msg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div className={styles.form_group}>
                  <label className={styles.label_radio}>Sex:</label>
                  <div className={styles.form_group_text_and_btn}>
                    <Field
                      className={styles.radio_btn}
                      type="radio"
                      name="sex"
                      value="Male"
                    />
                    <span className={styles.radio_text}>Male</span>
                  </div>
                  <div className={styles.form_group_text_and_btn}>
                    <Field
                      className={styles.radio_btn}
                      type="radio"
                      name="sex"
                      value="Female"
                    />
                    <span className={styles.radio_text}>Female</span>
                  </div>
                </div>
                <ErrorMessage name="sex">
                  {(msg) => (
                    <div className={styles.validation_error}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div className={styles.bottom_group_wrapper}>
                <div className={styles.form_group}>
                  <label className={styles.label_radio}>
                    Level of Activity:
                  </label>
                  <div className={styles.form_group_text_and_btn}>
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
                  <div className={styles.form_group_text_and_btn}>
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
                  <div className={styles.form_group_text_and_btn}>
                    <Field
                      className={styles.radio_btn}
                      type="radio"
                      name="levelActivity"
                      value="Moderately active"
                    />
                    <span className={styles.radio_text}>
                      Moderately active (moderate exercises/sports 3-5 days per
                      week)
                    </span>
                  </div>
                  <div className={styles.form_group_text_and_btn}>
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
                  <div className={styles.form_group_text_and_btn}>
                    <Field
                      className={styles.radio_btn}
                      type="radio"
                      name="levelActivity"
                      value="Extremely active"
                    />
                    <span className={styles.radio_text}>
                      Extremely active (very strenuous exercises/sports and
                      physical work)
                    </span>
                  </div>
                  <ErrorMessage name="levelActivity">
                    {(msg) => (
                      <div className={styles.validation_error}>{msg}</div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div className={styles.nav_btn_wrapper}>
                <Link
                  href="/user-data"
                  className={styles.nav_btn_back}
                  onClick={handleRemoveState}
                >
                  <Image
                    src={'/back.svg'}
                    alt="icon back page"
                    width={20}
                    height={20}
                  />
                  <span>Back</span>
                </Link>
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
              </div>
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

export default DataUserStepTwo;
