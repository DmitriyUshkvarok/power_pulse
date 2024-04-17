import styles from './_product.module.scss';
import Container from '@/src/Components/Container/Container';
import ProductPageComponent from '@/src/Components/Product/ProductPageComponent/ProductPageComponent';
import { getProductsByUserId } from '@/src/app/actions/productActions';
import { getServerSession } from 'next-auth';
import { authOption } from '@/src/utils/authOptions';

const Products = async () => {
  const session = await getServerSession(authOption);

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
