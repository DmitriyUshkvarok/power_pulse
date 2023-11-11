import styles from './page.module.scss';
import Container from '../Components/Container/Container';
import Link from 'next/link';

export default function Home() {
  return (
    <section className={styles.home_section}>
      <Container>
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
