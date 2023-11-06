import styles from './_navigation.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Navigation = () => {
  return (
    <div>
      <Link href="/" className={styles.header_logo}>
        <Image
          src={'/logo-icon.svg'}
          alt="header logo"
          width={44}
          height={17}
        />
        <p>PowerPulse</p>
      </Link>
      <nav>
        <Link href="/diary">Diary</Link>
        <Link href="/products">Products</Link>
        <Link href="/exercises">Exercises</Link>
        <Link href="/profile">Profile</Link>
        <div>Logout</div>
      </nav>
    </div>
  );
};

export default Navigation;
