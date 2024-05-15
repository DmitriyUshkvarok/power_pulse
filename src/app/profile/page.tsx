import ProfileForm from '@/src/Components/Profile/ProfileForm/ProfileForm';
import ProfileCard from '@/src/Components/Profile/ProfileCard/ProfileCard';
import styles from './_ProfilePage.module.scss';
import Container from '@/src/Components/Container/Container';

export const metadata = {
  title: 'User Profile | Power Pulse',
  description: 'App Power Pulse',
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
