import styles from './_muscles_dynamic_page.module.scss';
import Image from 'next/image';
import DynamicExercisesPageComponent from '@/src/Components/Exercises/DynamicExercisesPageComponent/DynamicExercisesPageComponent';
import { ParamsId } from '../../body-parts/[id]/page';
import { getExerciseSubCategory } from '@/src/app/actions/exercisesActions';

export async function generateMetadata({ params }: ParamsId) {
  const id = params.id;

  const exercises = await getExerciseSubCategory();

  const exercisesItem = exercises.find((item) => item._id === id);

  return {
    title: exercisesItem?.title,
    description:
      'Power Pulse is your ultimate fitness companion, designed for both trainers and enthusiasts alike. Seamlessly integrated with calorie tracking, it helps you achieve your fitness goals by accurately monitoring your daily calorie intake and expenditure. Whether youre aiming to lose weight, build muscle, or maintain a healthy lifestyle, Power Pulse provides comprehensive insights tailored to your needs.With Power Pulse, you can effortlessly track your daily calorie consumption based on your individual requirements. Simply input your daily calorie goal, and the app will guide you through every meal and snack, ensuring you stay on track towards your target. Moreover, its intuitive interface makes logging workouts a breeze, allowing you to record each session and the calories burned in real-time.Stay motivated and accountable by logging your daily workouts and monitoring your progress over time. Whether youre hitting the gym, going for a run, or practicing yoga, Power Pulse ensures that every calorie burned counts towards your fitness journey.Take charge of your fitness and nutrition with Power Pulse today. Transform your lifestyle, reach your fitness milestones, and unleash your full potential with the ultimate workout and diet management app.',
    alternates: {
      canonical: `/exercises/muscles/${id}`,
      languages: {
        'en-US': `/en-US/exercises/muscles/${id}`,
        'de-DE': `/de-DE/exercises/muscles/${id}`,
      },
    },
    openGraph: {
      title: `Power Pulse ${exercisesItem?.title} | Dmitriy Ushkvarok`,
      description: 'Welcome to my App Power Pulse',
      images: [
        {
          url: exercisesItem?.imageURL,
          width: 400,
          height: 300,
        },
      ],
      type: 'website',
      siteName: 'Dmitriy Ushkvarok Power Pulse App',
    },
  };
}

const MusclesDynamicPage = ({ params }: ParamsId) => {
  const { id } = params;
  return (
    <section className={styles.dynamic_page_section} style={{ color: 'white' }}>
      <DynamicExercisesPageComponent id={id} />
      <Image
        className={styles.background_fon_page}
        src="/auth-form-background-desctop.jpg"
        alt="backround page"
        width={600}
        height={800}
      />
    </section>
  );
};

export default MusclesDynamicPage;
