'use client';
import ProductFilter from '../ProductFilter/ProductFilter';
import ProductList from '../ProductList/ProductList';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/src/hooks/redux-hook';
import {
  CreateProductSuccessResponse,
  ServerError,
} from '@/src/app/actions/productActions';

interface ProductPageComponentProps {
  productData: CreateProductSuccessResponse[] | ServerError;
}

const ProductPageComponent = ({ productData }: ProductPageComponentProps) => {
  const [filteredProductData, setFilteredProductData] = useState(productData);

  const selectedCategory = useAppSelector(sessionSelectors.getSelectedCategory);
  const recommendation = useAppSelector(sessionSelectors.getRecommendation);

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
    const isRecommended = recommendation === 'recommended';
    const filteredData = productData.filter((product) => {
      const categoryMatch =
        selectedCategory === '' || product.category === selectedCategory;
      const recommendationMatch =
        recommendation === 'all' || product.recommended === isRecommended;
      return categoryMatch && recommendationMatch;
    });

    setFilteredProductData(filteredData);
  };

  const handleSearchSubmit = (searchText: string) => {
    const searchResults = productData.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProductData(searchResults);
  };

  const handleRecommendationChange = (recommendation: string) => {
    const isAll = recommendation === 'all';
    const isRecommended = recommendation === 'recommended';

    const filteredData = productData.filter((product) => {
      const categoryMatch =
        selectedCategory === '' || product.category === selectedCategory;
      const recommendationMatch =
        isAll || product.recommended === isRecommended;
      return categoryMatch && recommendationMatch;
    });

    setFilteredProductData(filteredData);
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
