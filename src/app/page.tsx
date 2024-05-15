'use server';
import styles from './page.module.scss';
import Container from '../Components/Container/Container';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Home Page | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};

export default async function Home() {
  const session = await getServerSession();
  return (
    <section className={styles.home_section}>
      <Container>
        <h1 className={styles.home_title}>
          Transforming your body shape with Power Pulse
        </h1>
        {!session && (
          <div className={styles.home_auth_navigation_wrapper}>
            <Link href="/signup" className={styles.home_auth_link}>
              Sign Up
            </Link>
            <Link href="/signin" className={styles.home_auth_link}>
              Sign In
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
