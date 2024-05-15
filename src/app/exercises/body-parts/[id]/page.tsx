import { getExerciseSubCategory } from '@/src/app/actions/exercisesActions';
import styles from './_body_parts_dynamic_page.module.scss';
import DynamicExercisesPageComponent from '@/src/Components/Exercises/DynamicExercisesPageComponent/DynamicExercisesPageComponent';
import Image from 'next/image';

export interface ParamsId {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ParamsId) {
  const id = params.id;

  const exercises = await getExerciseSubCategory();

  const exercisesItem = exercises.find((item) => item._id === id);

  return {
    title: exercisesItem?.title,
    description: 'Dynamic Page Exercises',
    alternates: {
      canonical: `/exercises/body-parts/${id}`,
      languages: {
        'en-US': `/en-US/exercises/body-parts/${id}`,
        'de-DE': `/de-DE/exercises/body-parts/${id}`,
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

const DynamicBodyPartsPage = ({ params }: ParamsId) => {
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

export default DynamicBodyPartsPage;
