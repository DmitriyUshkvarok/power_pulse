import styles from './_loader_app.module.scss';
import Image from 'next/image';

const LoaderApp = () => {
  return (
    <div className={styles.loaderContainer}>
      <Image
        src="/sport_loader.svg"
        alt="sport icom loader"
        width={250}
        height={250}
        className={styles.orangeIcon}
      />
    </div>
  );
};

export default LoaderApp;
