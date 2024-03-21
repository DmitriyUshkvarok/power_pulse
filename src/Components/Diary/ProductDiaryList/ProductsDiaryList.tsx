'use client';
import styles from './_product_diary_list.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { ProductComponentProps } from '../ProductComponent/ProductComponent';

const ProductsDiaryList = ({ productDiaryData }: ProductComponentProps) => {
  return (
    <div className={styles.products_diary_box}>
      <div className={styles.products_diary_box_header}>
        <h3 className={styles.products_diary_box_title}>Products</h3>
        <Link className={styles.products_diary_box_link} href="/products">
          Add product
        </Link>
      </div>
      <ul className={styles.product_diary_list}>
        {productDiaryData?.map((product) => (
          <li className={styles.product_diary_item} key={product._id}>
            <div className={styles.field_group}>
              <div className={styles.field_title}>Title</div>
              <div className={styles.field_values}>{product.title}</div>
            </div>
            <div className={styles.field_group}>
              <div className={styles.field_title}>Category</div>
              <div className={styles.field_values}>{product.category}</div>
            </div>
            <div className={styles.field_group}>
              <div className={styles.sub_field_group}>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Calories</div>
                  <div className={styles.field_values}>{product.calories}</div>
                </div>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Weight</div>
                  <div className={styles.field_values}>{product.weight}</div>
                </div>
                <div className={styles.sub_field_group_box}>
                  <div className={styles.field_title}>Recommended</div>
                  <div className={styles.field_values}>
                    {product.recommended ? (
                      <span className={styles.field_values_span_true}>Yes</span>
                    ) : (
                      <span className={styles.field_values_span_false}>No</span>
                    )}
                  </div>
                </div>
                <Image
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
