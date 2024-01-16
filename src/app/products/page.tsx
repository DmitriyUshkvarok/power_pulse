import styles from './_product.module.scss';
import Container from '@/src/Components/Container/Container';
import ProductPageComponent from '@/src/Components/Product/ProductPageComponent/ProductPageComponent';

const Products = () => {
  return (
    <section className={styles.product_page_section}>
      <Container>
        <ProductPageComponent />
      </Container>
    </section>
  );
};

export default Products;
