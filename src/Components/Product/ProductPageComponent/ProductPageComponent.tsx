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

  const handleRecommendationChange = (recommendation: string) => {
    if (recommendation === 'all') {
      setFilteredProductData(productData);
    } else {
      const isRecommended = recommendation === 'recommended';
      const filteredData = productData.filter(
        (product) => product.recommended === isRecommended
      );
      setFilteredProductData(filteredData);
    }
  };

  return (
    <div>
      <ProductFilter
        categories={categories}
        handleCategoryChange={handleCategoryChange}
        handleSearchSubmit={handleSearchSubmit}
        handleRecommendationChange={handleRecommendationChange}
      />
      <ProductList productData={filteredProductData} />
    </div>
  );
};

export default ProductPageComponent;
