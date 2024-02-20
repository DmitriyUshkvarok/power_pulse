'use client';
import ProductFilter from '../ProductFilter/ProductFilter';
import ProductList from '../ProductList/ProductList';
import { useState, useEffect } from 'react';
import {
  CreateProductSuccessResponse,
  ServerError,
} from '@/src/app/actions/productActions';

interface ProductPageComponentProps {
  productData: CreateProductSuccessResponse[] | ServerError;
}

const ProductPageComponent = ({ productData }: ProductPageComponentProps) => {
  const [filteredProductData, setFilteredProductData] = useState(productData);

  useEffect(() => {
    setFilteredProductData(productData);
  }, [productData]);

  if (!Array.isArray(productData)) {
    return null;
  }

  const categories = productData
    .map((product) => product.category)
    .filter((category, index, self) => self.indexOf(category) === index);

  const handleCategoryChange = (selectedCategory: string) => {
    if (selectedCategory === '') {
      setFilteredProductData(productData);
    } else {
      const filteredData = productData.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProductData(filteredData);
    }
  };

  const handleSearchSubmit = (searchText: string) => {
    const searchResults = productData.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProductData(searchResults);
  };

  return (
    <div>
      <ProductFilter
        categories={categories}
        handleCategoryChange={handleCategoryChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      <ProductList productData={filteredProductData} />
    </div>
  );
};

export default ProductPageComponent;
