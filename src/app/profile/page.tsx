import ProfileForm from '@/src/Components/Profile/ProfileForm/ProfileForm';
import ProfileCard from '@/src/Components/Profile/ProfileCard/ProfileCard';
import styles from './_ProfilePage.module.scss';
import Container from '@/src/Components/Container/Container';

const ProfilePage = async () => {
  return (
    <section className={styles.profile_section}>
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
