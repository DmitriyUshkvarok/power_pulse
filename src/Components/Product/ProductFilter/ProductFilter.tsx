'use client';
import styles from './_product_filter.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import {
  setSelectedCategory,
  setRecommendation,
} from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';

interface ProductFilterProps {
  categories: string[];
  handleCategoryChange: (selectedCategory: string) => void;
  handleSearchSubmit: (searchText: string) => void;
  handleRecommendationChange: (recommendation: string) => void;
}

const ProductFilter = ({
  categories,
  handleCategoryChange,
  handleSearchSubmit,
  handleRecommendationChange,
}: ProductFilterProps) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(sessionSelectors.getSelectedCategory);
  const recommendation = useAppSelector(sessionSelectors.getRecommendation);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    dispatch(setSelectedCategory(category));
    handleCategoryChange(category);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const clearInput = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setSearchText('');
    handleSearchSubmit('');
  };

  const handleSubmit = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    handleSearchSubmit(searchText);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchSubmit(searchText);
    }
  };

  const handleRecommendationChangeInternal = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const recommendation = event.target.value;
    dispatch(setRecommendation(recommendation));
    handleRecommendationChange(recommendation);
  };

  return (
    <div className={styles.product_page_filter_container}>
      <h1 className={styles.product_page_title}>Products</h1>
      <div className={styles.product_page_filter_wrapper}>
        <div className={styles.product_page_filter_group}>
          <Link
            className={styles.product_page_filter_create_link}
            href="/create-product"
          >
            Add a product card
          </Link>
        </div>
        <div className={styles.product_page_filter_group}>
          <input
            className={styles.product_page_filter_search_input}
            type="text"
            placeholder="Search"
            name="search"
            value={searchText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Image
            onClick={handleSubmit}
            className={styles.icons_search}
            src="/search.svg"
            width={18}
            height={18}
            alt="search icon"
          />
          {searchText && (
            <Image
              className={styles.icons_clear}
              src="/x.svg"
              width={18}
              height={18}
              alt="clear icon"
              onClick={clearInput}
            />
          )}
        </div>
        <div className={styles.product_page_select_group}>
          <div className={styles.product_page_filter_group}>
            <select
              className={styles.product_page_filter_categories_select}
              value={selectedCategory}
              onChange={handleChange}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Image
              className={styles.icons_down}
              src="/chevron-down.svg"
              width={18}
              height={18}
              alt="chevron-down"
            />
          </div>
          <div className={styles.product_page_filter_group}>
            <select
              className={styles.product_page_filter_recommended_select}
              value={recommendation}
              onChange={handleRecommendationChangeInternal}
            >
              <option value="all">All</option>
              <option value="recommended">Recommended</option>
              <option value="not recommended">Not recommended</option>
            </select>
            <Image
              className={styles.icons_down}
              src="/chevron-down.svg"
              width={18}
              height={18}
              alt="chevron-down"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
