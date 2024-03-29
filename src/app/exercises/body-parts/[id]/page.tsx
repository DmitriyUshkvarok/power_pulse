import styles from './_body_parts_dynamic_page.module.scss';

export interface ParamsId {
  params: {
    id: string;
  };
}

const DynamicBodyPartsPage = ({ params }: ParamsId) => {
  const { id } = params;

  return (
    <section className={styles.dynamic_page_section} style={{ color: 'white' }}>
      dynamic page body parts
    </section>
  );
};

export default DynamicBodyPartsPage;
