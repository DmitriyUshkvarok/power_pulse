import styles from './_muscles_dynamic_page.module.scss';
import { ParamsId } from '../../body-parts/[id]/page';

const MusclesDynamicPage = ({ params }: ParamsId) => {
  const { id } = params;
  return (
    <section className={styles.dynamic_page_section} style={{ color: 'white' }}>
      dynamic page Muscles
    </section>
  );
};

export default MusclesDynamicPage;
