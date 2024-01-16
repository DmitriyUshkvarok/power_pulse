'use client';
import styles from './_product_filter.module.scss';
import Image from 'next/image';
import { useState } from 'react';

const ProductFilter = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const clearInput = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setSearchText('');
  };

  return (
    <div className={styles.product_page_filter_container}>
      <h1 className={styles.product_page_title}>Products</h1>
      <div className={styles.product_page_filter_wrapper}>
        <div className={styles.product_page_filter_group}>
          <input
            className={styles.product_page_filter_search_input}
            type="text"
            placeholder="Search"
            name="search"
            value={searchText}
            onChange={handleInputChange}
          />
          <Image
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
            <select className={styles.product_page_filter_categories_select}>
              <option value="categories">Categories</option>
              <option value="alcoholic drinks">Alcoholic drinks</option>
              <option value="berries">Berries</option>
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
            <select className={styles.product_page_filter_recommended_select}>
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
