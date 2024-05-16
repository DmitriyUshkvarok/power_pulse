import ProfileForm from '@/src/Components/Profile/ProfileForm/ProfileForm';
import ProfileCard from '@/src/Components/Profile/ProfileCard/ProfileCard';
import styles from './_ProfilePage.module.scss';
import Container from '@/src/Components/Container/Container';

export const metadata = {
  title: 'User Profile | Power Pulse',
  description:
    'Power Pulse is your ultimate fitness companion, designed for both trainers and enthusiasts alike. Seamlessly integrated with calorie tracking, it helps you achieve your fitness goals by accurately monitoring your daily calorie intake and expenditure. Whether youre aiming to lose weight, build muscle, or maintain a healthy lifestyle, Power Pulse provides comprehensive insights tailored to your needs.With Power Pulse, you can effortlessly track your daily calorie consumption based on your individual requirements. Simply input your daily calorie goal, and the app will guide you through every meal and snack, ensuring you stay on track towards your target. Moreover, its intuitive interface makes logging workouts a breeze, allowing you to record each session and the calories burned in real-time.Stay motivated and accountable by logging your daily workouts and monitoring your progress over time. Whether youre hitting the gym, going for a run, or practicing yoga, Power Pulse ensures that every calorie burned counts towards your fitness journey.Take charge of your fitness and nutrition with Power Pulse today. Transform your lifestyle, reach your fitness milestones, and unleash your full potential with the ultimate workout and diet management app.',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};

const ProfilePage = () => {
  return (
    <section className={styles.profile_section}>
      <h1 className="hiddenTitle">
        Power Pulse Dmitriy Ushkvarok Profile Page
      </h1>
      <Container>
        <h1 className={styles.profile_title}>Profile Settings</h1>
        <div className={styles.profile_basic_block}>
          <div className={styles.profile_basic_block_cart}>
            <ProfileCard />
          </div>
          <div>
            <ProfileForm />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;
