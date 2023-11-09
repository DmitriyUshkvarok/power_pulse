import styles from './page.module.scss';
import Container from '../Components/Container/Container';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <section className={styles.home_section}>
      <Container>
        <Link href="/" className={styles.header_logo_home}>
          <Image
            src={'/logo-icon.svg'}
            alt="header logo"
            width={44}
            height={17}
          />
          <p>PowerPulse</p>
        </Link>
        <h1 className={styles.home_title}>
          Transforming your body shape with Power Pulse
        </h1>
        <div className={styles.home_auth_navigation_wrapper}>
          <Link href="/signup" className={styles.home_auth_link}>
            Sign Up
          </Link>
          <Link href="/signin" className={styles.home_auth_link}>
            Sign In
          </Link>
        </div>
      </Container>
    </section>
  );
}
