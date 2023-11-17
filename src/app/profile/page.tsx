import ProfileForm from '@/src/Components/Profile/ProfileForm/ProfileForm';
import ProfileCard from '@/src/Components/Profile/ProfileCard/ProfileCard';
import styles from './_ProfilePage.module.scss';
import Container from '@/src/Components/Container/Container';

const ProfilePage = () => {
  return (
    <section className={styles.profile_section}>
      <Container>
        <div>
          <div>
            <ProfileForm />
          </div>
          <div>
            <ProfileCard />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;
