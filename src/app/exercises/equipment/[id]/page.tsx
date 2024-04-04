import styles from './_equipment_dynamic_page.module.scss';
import Image from 'next/image';
import DynamicExercisesPageComponent from '@/src/Components/Exercises/DynamicExercisesPageComponent/DynamicExercisesPageComponent';
import { ParamsId } from '../../body-parts/[id]/page';

const EquipmentDynamicPage = ({ params }: ParamsId) => {
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

export default EquipmentDynamicPage;
