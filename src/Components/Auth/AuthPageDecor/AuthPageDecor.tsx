'use client';
import Image from 'next/image';
import styles from './_AuthPageDecor.module.scss';
const AuthPageDecor = () => {
  return (
    <div className={styles.decor_box}>
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
    </div>
  );
};

export default AuthPageDecor;
