import styles from './_sign_in.module.scss';
import Container from '@/src/Components/Container/Container';
import AuthPageDecor from '@/src/Components/Auth/AuthPageDecor/AuthPageDecor';
import FormLogin from '@/src/Components/Auth/LoginForm/LoginForm';
import RestrictRoute from '@/src/Context/RestrictRoute';

const SignInPage = () => {
  return (
    <RestrictRoute>
      <section className={styles.sign_up_section}>
        <Container>
          <div className={styles.sign_up_content_wrapper}>
            <div>
              <FormLogin />
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

export default SignInPage;
