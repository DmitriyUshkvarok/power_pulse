import styles from './_body_parts_dynamic_page.module.scss';
import DynamicExercisesPageComponent from '@/src/Components/Exercises/DynamicExercisesPageComponent/DynamicExercisesPageComponent';

export interface ParamsId {
  params: {
    id: string;
  };
}

const DynamicBodyPartsPage = ({ params }: ParamsId) => {
  const { id } = params;

  return (
    <section className={styles.dynamic_page_section} style={{ color: 'white' }}>
      <DynamicExercisesPageComponent id={id} />
    </section>
  );
};

export default DynamicBodyPartsPage;
