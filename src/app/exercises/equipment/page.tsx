import ExercisesComponent from '@/src/Components/Exercises/ExercisesComponent/ExercisesComponent';

export const metadata = {
  title: 'Excercises Equipment | Power Pulse',
  description: 'App Power Pulse',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
};
const EquipmentPage = () => {
  return <ExercisesComponent />;
};

export default EquipmentPage;
