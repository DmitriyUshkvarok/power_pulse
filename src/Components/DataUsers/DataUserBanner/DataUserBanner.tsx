import styles from './_data_user_baner.module.scss';
import Image from 'next/image';

const DataUserBanner = () => {
  return (
    <>
      <div
        className={styles.video_tutorial_banner}
        data-testid="video-banner-block"
      >
        <div className={styles.video_tutorial_banner_icon}>
          <Image
            data-testid="header-logo"
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
      <div className={styles.cal_banner} data-testid="call-banner-block">
        <div className={styles.cal_banner_icon}>
          <Image
            data-testid="header-logo-cal"
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
    </>
  );
};

export default DataUserBanner;
