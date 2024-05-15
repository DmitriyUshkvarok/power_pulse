import ExercisesComponent from '@/src/Components/Exercises/ExercisesComponent/ExercisesComponent';

export const metadata = {
  title: 'Excercises Body Parts | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};
const BodyPartsPage = () => {
  return <ExercisesComponent />;
};

export default BodyPartsPage;
