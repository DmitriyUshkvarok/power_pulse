'use client';
import ProductFilter from '../ProductFilter/ProductFilter';
import ProductList from '../ProductList/ProductList';
import { ProductPageComponentProps } from './types';

const ProductPageComponent = ({ productData }: ProductPageComponentProps) => {
  if (!Array.isArray(productData)) {
    return null;
  }

  const categories = productData
    .map((product) => product.category)
    .filter((category, index, self) => self.indexOf(category) === index);

  return (
    <div>
      <ProductFilter categories={categories} />
      <ProductList productData={productData} />
    </div>
  );
};

export default ProductPageComponent;
