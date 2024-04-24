import styles from './_product.module.scss';
import Container from '@/src/Components/Container/Container';
import ProductPageComponent from '@/src/Components/Product/ProductPageComponent/ProductPageComponent';
import { getProductsByUserId } from '@/src/app/actions/productActions';
import { getSessionWithAuthOptions } from '@/src/utils/serverSession';

const Products = async () => {
  const session = await getSessionWithAuthOptions();

  const userId = session?.user?._id;
  const productData = await getProductsByUserId(userId);
  return (
    <section className={styles.product_page_section}>
      <Container>
        <ProductPageComponent productData={productData} />
      </Container>
    </section>
  );
};

export default Products;
