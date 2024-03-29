import styles from './_equipment_dynamic_page.module.scss';
import { ParamsId } from '../../body-parts/[id]/page';

const EquipmentDynamicPage = ({ params }: ParamsId) => {
  const { id } = params;
  return (
    <section className={styles.dynamic_page_section} style={{ color: 'white' }}>
      dynamic page Equipment
    </section>
  );
};

export default EquipmentDynamicPage;
