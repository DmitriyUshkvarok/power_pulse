'use client';
import styles from './_DataUserStepThree.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../../Container/Container';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/redux/store';

const DataUserStepThree = () => {
  const userData = useSelector((state: RootState) => state.userData.items);

  const data1 = userData[0];
  const data2 = userData[1];

  const combinedData = { ...data1, ...data2 };

  const handleGoButtonClick = () => {
    console.log(combinedData);
  };

  return (
    <section className={styles.step_three_section}>
      <Container>
        <h1 className={styles.step_three_section_title}>Dear user</h1>
        <p className={styles.step_three_section_description}>
          Thank you for filling in all the required data. We greatly appreciate
          your cooperation and commitment to a healthy lifestyle. The collected
          information will allow us to provide you with a more individual and
          personalized approach.
        </p>
        <div className={styles.btn_panel}>
          <button
            className={styles.btn_go}
            // type="submit"
            onClick={handleGoButtonClick}
          >
            Go
          </button>
          <Link href="/user-data/step-two" className={styles.nav_btn_back}>
            <Image
              src={'/back.svg'}
              alt="icon back page"
              width={20}
              height={20}
            />
            <span>Back</span>
          </Link>
        </div>
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

export default DataUserStepThree;
