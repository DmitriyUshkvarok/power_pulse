'use client';
import styles from './_ProfileCard.module.scss';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Notiflix from 'notiflix';
import { resetUserData } from '@/src/redux/userData/userDataSlice';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';

const ProfileCard = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handleClickLogOut = () => {
    Notiflix.Confirm.show(
      'Confirmation',
      'Are you sure you want to log out?',
      'Yes',
      'No',
      async () => {
        try {
          dispatch(resetUserData());
          signOut({ callbackUrl: '/' });
        } catch (error) {
          console.error(error);
        }
      },
      () => {}
    );
  };

  return (
    <div className={styles.profile_container}>
      <div className={styles.user_photo_block}>
        <Image
          className={styles.user_img}
          src={session?.user?.image || '/icon_user.svg'}
          alt="user icon(photo)"
          width={61}
          height={61}
        />
        <div className={styles.add_photo_block}>
          <Image
            src={'/add_photo.svg'}
            alt="add photo icon"
            width={24}
            height={24}
          />
        </div>
      </div>
      <h2 className={styles.user_name}>{session?.user?.name}</h2>
      <div className={styles.user_role}>User</div>
      <div className={styles.daily_block}>
        <div className={styles.daily_colories}>
          <div className={styles.daily_colories_top_block}>
            <Image
              src="/icon-daily.svg"
              alt="calories decor icon"
              width={20}
              height={20}
            />
            <div className={styles.daily_colories_top_text}>
              Daily calorie intake
            </div>
          </div>
          <div className={styles.daily_colories_counter}>2200</div>
        </div>
        <div className={styles.daily_sport}>
          <div className={styles.daily_sport_top_block}>
            <Image
              src="/icon-sport.svg"
              alt="sport decor icon"
              width={20}
              height={20}
            />
            <div className={styles.daily_sport_top_text}>
              Daily norm of sports
            </div>
          </div>
          <div className={styles.daily_sport_counter}>110 min</div>
        </div>
      </div>

      <div className={styles.warning_block}>
        <div className={styles.warning_icon_block}>
          <Image
            src="/warning-icon.svg"
            alt="warning icon"
            width={24}
            height={24}
          />
        </div>
        <p className={styles.warning_text}>
          We understand that each individual is unique, so the entire approach
          to diet is relative and tailored to your unique body and goals.
        </p>
      </div>

      <div
        className={styles.logout}
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          handleClickLogOut()
        }
      >
        <Image src="/log-out.svg" alt="log out icon" width={20} height={20} />
        Logout
      </div>
    </div>
  );
};

export default ProfileCard;
