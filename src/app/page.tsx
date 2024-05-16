'use server';
import styles from './page.module.scss';
import Container from '../Components/Container/Container';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

export async function generateMetadata() {
  return {
    title: 'Home Page',
    description:
      'Power Pulse is your ultimate fitness companion, designed for both trainers and enthusiasts alike. Seamlessly integrated with calorie tracking, it helps you achieve your fitness goals by accurately monitoring your daily calorie intake and expenditure.',
    alternates: {
      canonical: `/`,
      languages: {
        'en-US': `/en-US/`,
        'de-DE': `/de-DE/`,
      },
    },
    openGraph: {
      title: `Power Pulse Home | Dmitriy Ushkvarok`,
      description:
        'Power Pulse is your ultimate fitness companion, designed for both trainers and enthusiasts alike. Seamlessly integrated with calorie tracking, it helps you achieve your fitness goals by accurately monitoring your daily calorie intake and expenditure. Whether youre aiming to lose weight, build muscle, or maintain a healthy lifestyle, Power Pulse provides comprehensive insights tailored to your needs.With Power Pulse, you can effortlessly track your daily calorie consumption based on your individual requirements. Simply input your daily calorie goal, and the app will guide you through every meal and snack, ensuring you stay on track towards your target. Moreover, its intuitive interface makes logging workouts a breeze, allowing you to record each session and the calories burned in real-time.Stay motivated and accountable by logging your daily workouts and monitoring your progress over time. Whether youre hitting the gym, going for a run, or practicing yoga, Power Pulse ensures that every calorie burned counts towards your fitness journey.Take charge of your fitness and nutrition with Power Pulse today. Transform your lifestyle, reach your fitness milestones, and unleash your full potential with the ultimate workout and diet management app.',
      images: [
        {
          url: '/openGraphImg.png',
          width: 400,
          height: 300,
        },
      ],
      type: 'website',
      siteName: 'Dmitriy Ushkvarok Power Pulse App',
    },
  };
}

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
