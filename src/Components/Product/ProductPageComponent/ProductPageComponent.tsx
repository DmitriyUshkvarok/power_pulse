import ProductFilter from '../ProductFilter/ProductFilter';
import ProductList from '../ProductList/ProductList';
import ProductForm from '../ProductForm/ProductForm';

interface ProductPageComponentProps {
  productData: any;
}

const ProductPageComponent = ({ productData }: ProductPageComponentProps) => {
  return (
    <div>
      <ProductForm />
      <ProductFilter />
      <ProductList productData={productData} />
    </div>
  );
};

export default ProductPageComponent;
