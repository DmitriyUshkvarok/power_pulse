import FormRegistration from '@/src/Components/Auth/RegistrationForm/RegistrationForm';
import styles from './_sign_up.module.scss';
import Container from '@/src/Components/Container/Container';
import AuthPageDecor from '@/src/Components/Auth/AuthPageDecor/AuthPageDecor';
import RestrictRoute from '../../Context/RestrictRoute';

export const metadata = {
  title: 'Sign Up | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};

const SignUpPagepage = () => {
  return (
    <RestrictRoute>
      <section className={styles.sign_up_section}>
        <h1 className="hiddenTitle">
          Power Pulse Dmitriy Ushkvarok Registration Page
        </h1>
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
    </RestrictRoute>
  );
};

export default SignUpPagepage;
