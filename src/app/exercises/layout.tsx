import styles from './_exercises.module.scss';
import ExercisesPanel from '@/src/Components/Exercises/ExercisesPanel/ExercisesPanel';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Excercises | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};

const ExercisesLayout = ({ children }: RootLayoutProps) => {
  return (
    <section className={styles.exercises_section}>
      <h1 className="hiddenTitle">
        Power Pulse Dmitriy Ushkvarok Exercises Page
      </h1>
      <ExercisesPanel />
      <div>{children}</div>
    </section>
  );
};

export default ExercisesLayout;
