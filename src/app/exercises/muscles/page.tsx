import ExercisesComponent from '@/src/Components/Exercises/ExercisesComponent/ExercisesComponent';

export const metadata = {
  title: 'Excercises Muscles | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};
const MusclesPage = () => {
  return <ExercisesComponent />;
};

export default MusclesPage;
