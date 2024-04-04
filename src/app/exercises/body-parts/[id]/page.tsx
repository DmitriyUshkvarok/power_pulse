import styles from './_body_parts_dynamic_page.module.scss';
import DynamicExercisesPageComponent from '@/src/Components/Exercises/DynamicExercisesPageComponent/DynamicExercisesPageComponent';
import Image from 'next/image';
import Modal from '@/src/Components/Modals/Modal/Modal';
import AddExercisesForm from '@/src/Components/Modals/AddExercisesModal/AddExercisesModal';
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
      <Image
        className={styles.background_fon_page}
        src="/auth-form-background-desctop.jpg"
        alt="backround page"
        width={600}
        height={800}
      />

      <Modal>
        <AddExercisesForm id={id} />
      </Modal>
    </section>
  );
};

export default DynamicBodyPartsPage;
