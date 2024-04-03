import styles from './_exercises.module.scss';
import ExercisesPanel from '@/src/Components/Exercises/ExercisesPanel/ExercisesPanel';
import Container from '@/src/Components/Container/Container';

interface RootLayoutProps {
  children: React.ReactNode;
}

const ExercisesLayout = ({ children }: RootLayoutProps) => {
  return (
    <section className={styles.exercises_section}>
      <ExercisesPanel />
      <div>{children}</div>
    </section>
  );
};

export default ExercisesLayout;
