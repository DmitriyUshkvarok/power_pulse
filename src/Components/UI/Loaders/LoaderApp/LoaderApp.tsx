import styles from './_loader_app.module.scss';
import Image from 'next/image';

const LoaderApp = () => {
  return (
    <div className={styles.loaderContainer} data-testid="loader-container">
      <Image
        src="/sport_loader.svg"
        alt="sport icon loader"
        width={150}
        height={150}
        className={styles.orangeIcon}
      />
    </div>
  );
};

export default LoaderApp;
