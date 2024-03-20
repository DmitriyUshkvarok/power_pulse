'use client';
import styles from './_product_list.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import {
  CreateProductSuccessResponse,
  deletedProduct,
  ServerError,
} from '@/src/app/actions/productActions';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import { setSelectedProduct } from '@/src/redux/addDiaryProductSlice/addDiaryProductSlice';
import { useEffect, useState } from 'react';
import { setFilteredProductData } from '@/src/redux/globalLocalSessionStoreSlice/globalLocalSessionStoreSlice';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';
import {
  openModal,
  openAddDiaryModal,
} from '@/src/redux/modalSlice/modalSlice';
interface ProductPageComponentProps {
  productData: CreateProductSuccessResponse[] | ServerError;
}

export interface ProductType {
  name: string;
  calories: string;
  category: string;
  weight: string;
  _id: string;
  recommended: boolean;
}

const ProductList = ({ productData }: ProductPageComponentProps) => {
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const filteredProductData = useAppSelector(sessionSelectors.getProductData);

  useEffect(() => {
    dispatch(setFilteredProductData(productData));
  }, [dispatch, productData]);

  const addProductToStore = (product: ProductType) => {
    dispatch(setSelectedProduct(product));
    dispatch(openModal());
    dispatch(openAddDiaryModal());
  };

  const handleDeletedProduct = async (productId: string) => {
    try {
      setLoadingProductId(productId);
      await deletedProduct(productId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProductId(null);
    }
  };

  if (!Array.isArray(filteredProductData)) {
    return null;
  }

  if (filteredProductData.length === 0) {
    return (
      <section className={styles.product_section}>
        <p className={styles.not_found_product}>
          <span className={styles.not_found_span_top}>
            Sorry, no results were found{' '}
          </span>
          for the product filters you selected. You may want to consider other
          search options to find the product you want. Our range is wide and you
          have the opportunity to find more options that suit your needs.
          <span className={styles.not_found_span_bottom}>
            Try changing the search parameters.
          </span>
        </p>
      </section>
    );
  }

  return (
    <section className={styles.product_section}>
      <ul className={styles.product_list}>
        {filteredProductData?.map((product: ProductType) => (
          <li key={product._id} className={styles.product_list_item}>
            <div className={styles.product_list_item_header}>
              <div className={styles.product_list_pin}>Diet</div>
              <div
                className={`${styles.product_list_tracker} ${
                  product.recommended
                    ? styles.product_list_tracker
                    : styles.product_list_tracker_not_recommended
                }`}
              >
                {product.recommended ? 'Recommended' : 'Not Recommended'}
              </div>
              <Link
                href="/add-diary"
                onClick={() => addProductToStore(product)}
              >
                <div className={styles.product_list_add_btn}>Add</div>
              </Link>
            </div>
            <div className={styles.product_list_item_middle}>
              {product.name}
            </div>
            <div className={styles.product_list_item_footer}>
              <div className={styles.product_list_item_calories}>
                Calories:
                <span className={styles.product_list_item_span}>
                  {product.calories}
                </span>
              </div>
              <div className={styles.product_list_item_category}>
                Category:
                <span className={styles.product_list_item_span}>
                  {product.category}
                </span>
              </div>
              <div className={styles.product_list_item_weight}>
                Weight:
                <span className={styles.product_list_item_span}>
                  {product.weight}
                </span>
              </div>
            </div>
            {loadingProductId === product._id ? (
              <p className={styles.deleted_product_loader}>Loading...</p>
            ) : (
              <Image
                onClick={() => handleDeletedProduct(product._id)}
                className={styles.deleted_product_icon}
                src="/deleted_product.svg"
                alt="deleted product icon"
                width={20}
                height={20}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
