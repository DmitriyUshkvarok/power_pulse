'use client';
import styles from './_DataUserStepThree.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../../Container/Container';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createDataAsync,
  fetchUserData,
} from '@/src/redux/userData/userDataSlice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { UserSession } from './index';

const DataUserStepThree = () => {
  const { data: session } = useSession();
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.userData.data);

  const userId = (session?.user as UserSession)?._id;
  const userDataId = (session?.user as UserSession)?.userData;

  const handleGoButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      if (session?.user) {
        setIsloading(true);
        await dispatch(createDataAsync({ id: userId, data: userData }));
        await dispatch(fetchUserData(userDataId));
        alert('success create user date');
        router.push('/diary');
        setIsloading(false);
      } else {
        alert('User not authenticated');
      }
    } catch (error) {
      setIsloading(false);
    }
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
            type="submit"
            onClick={handleGoButtonClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Go'}
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
