'use client';
import styles from './_DataUserStepThree.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../../Container/Container';
import DataUserBanner from '../DataUserBanner/DataUserBanner';
import DataUserNavigationList from '../DataUserNavigationList/DataUserNavigationList';
import useRouterPush from '@/src/hooks/useRouter';
import useUserSession from '@/src/hooks/useUserSession';
import Button from '../../UI/Buttons/ButtonSubmit/Button';
import { useState } from 'react';
import {
  createDataAsync,
  fetchUserData,
} from '@/src/redux/userData/userDataSlice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';

const DataUserStepThree = () => {
  const { session, userId, userDataId } = useUserSession();
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useAppDispatch();
  const { pushRoute } = useRouterPush();

  const userData = useAppSelector((state) => state.userData.data);

  const handleGoButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      if (session?.user) {
        setIsloading(true);
        await dispatch(createDataAsync({ id: userId, data: userData }));
        await dispatch(fetchUserData(userDataId));
        pushRoute('/diary');
      } else {
        alert('User not authenticated');
      }
    } catch (error) {
      setIsloading(false);
    } finally {
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
          <Button
            className={styles.btn_go}
            type="submit"
            onClick={handleGoButtonClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Go'}
          </Button>
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
        <DataUserBanner />
        <DataUserNavigationList />
      </Container>
    </section>
  );
};

export default DataUserStepThree;
