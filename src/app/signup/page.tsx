import FormRegistration from '@/src/Components/Auth/RegistrationForm/RegistrationForm';
import styles from './_sign_up.module.scss';
import Container from '@/src/Components/Container/Container';
import AuthPageDecor from '@/src/Components/Auth/AuthPageDecor/AuthPageDecor';

const SignUpPagepage = () => {
  return (
    <section className={styles.sign_up_section}>
      <Container>
        <div className={styles.sign_up_content_wrapper}>
          <div>
            <FormRegistration />
          </div>
          <div className={styles.sign_up_decor_wrapper}>
            <AuthPageDecor />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SignUpPagepage;
