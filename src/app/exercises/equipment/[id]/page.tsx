import styles from './_equipment_dynamic_page.module.scss';
import DynamicExercisesPageComponent from '@/src/Components/Exercises/DynamicExercisesPageComponent/DynamicExercisesPageComponent';
import { ParamsId } from '../../body-parts/[id]/page';

const EquipmentDynamicPage = ({ params }: ParamsId) => {
  const { id } = params;
  return (
    <section className={styles.dynamic_page_section} style={{ color: 'white' }}>
      <DynamicExercisesPageComponent id={id} />
    </section>
  );
};

export default EquipmentDynamicPage;
