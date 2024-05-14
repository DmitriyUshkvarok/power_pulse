'use client';
import styles from './_product_diary_list.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import useUserSession from '@/src/hooks/useUserSession';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hook';
import {
  fetchDiaryProducts,
  deleteDiaryProduct,
} from '@/src/redux/diarySlice/diarySlice';
import { sessionSelectors } from '@/src/redux/globalLocalSessionStoreSlice/globalSessionSelector';
import { formatDateString } from '@/src/utils/formatDate';

const ProductsDiaryList = () => {
  const isTabletDevice = useMediaQuery({ minWidth: '768px' });
  const dispatch = useAppDispatch();
  const { userId } = useUserSession();

  const productDiaryData = useAppSelector((state) => state.diary.diaryProducts);

  const selectedDate = useAppSelector(sessionSelectors.getDate);

  const formattedDate = formatDateString(selectedDate);

  const filteredProducts = productDiaryData?.filter((product) => {
    return product.date === formattedDate;
  });

  useEffect(() => {
    dispatch(fetchDiaryProducts(userId));
  }, [dispatch, userId]);

  const handleDeletedDiaryProduct = async (productId: string) => {
    try {
      dispatch(deleteDiaryProduct(productId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.products_diary_box}>
      <div className={styles.products_diary_box_header}>
        <h2 className={styles.products_diary_box_title}>Products</h2>
        <Link className={styles.products_diary_box_link} href="/products">
          Add product
        </Link>
      </div>
      <ul className={styles.product_diary_list}>
        {!filteredProducts.length && (
          <li className={styles.not_found_products}>Not found products</li>
        )}
        {isTabletDevice && filteredProducts.length > 0 && (
          <li className={styles.title_list}>
            <div className={`${styles.title_item} ${styles.title_one}`}>
              Title
            </div>
            <div className={`${styles.title_item} ${styles.title_two}`}>
              Category
            </div>
            <div className={`${styles.title_item} ${styles.title_three}`}>
              Calories
            </div>
            <div className={`${styles.title_item} ${styles.title_three}`}>
              Weight
            </div>
            <div className={`${styles.title_item} ${styles.title_four}`}>
              Recommended
            </div>
          </li>
        )}
        {filteredProducts?.map((product) => (
          <li className={styles.product_diary_item} key={product._id}>
            <div className={styles.field_group}>
              <div className={styles.field_title}>Title</div>
              <div className={`${styles.field_values} ${styles.first_value}`}>
                {product.title}
              </div>
            </div>
            <div className={styles.field_group}>
              <div className={styles.field_title}>Category</div>
              <div className={`${styles.field_values} ${styles.second_value}`}>
                {product.category}
              </div>
            </div>
            <div className={styles.field_group}>
              <div className={styles.sub_field_group}>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Calories</div>
                  <div
                    className={`${styles.field_values} ${styles.third_value}`}
                  >
                    {product.calories}
                  </div>
                </div>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Weight</div>
                  <div
                    className={`${styles.field_values} ${styles.third_value}`}
                  >
                    {product.weight}
                  </div>
                </div>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Recommended</div>
                  <div
                    className={`${styles.field_values} ${styles.fourth_value}`}
                  >
                    {product.recommended ? (
                      <span className={styles.field_values_span_true}>Yes</span>
                    ) : (
                      <span className={styles.field_values_span_false}>No</span>
                    )}
                  </div>
                </div>
                <Image
                  onClick={() => handleDeletedDiaryProduct(product._id)}
                  className={styles.deleted_diary_product_icon}
                  src="/deleted_product.svg"
                  alt="deleted product diart icon"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsDiaryList;
