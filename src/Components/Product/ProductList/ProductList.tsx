'use client';
import styles from './_product_list.module.scss';
import Link from 'next/link';
import { ProductDocument } from '@/src/models/userProductsModel';

interface ProductPageComponentProps {
  productData: any;
}

export interface ProductType {
  name: string;
  calories: number;
  category: string;
  quantity: number;
  _id: string;
}

const ProductList = ({ productData }: ProductPageComponentProps) => {
  return (
    <section className={styles.product_section}>
      <ul className={styles.product_list}>
        {productData?.map((product: ProductType) => (
          <li key={product._id} className={styles.product_list_item}>
            <div className={styles.product_list_item_header}>
              <div className={styles.product_list_pin}>Diet</div>
              <div className={styles.product_list_tracker}>Recommended</div>
              <Link href="/add-diray">
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
                  {product.quantity}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>

    // <section className={styles.product_section}>
    //   <ul className={styles.product_list}>
    //     <li className={styles.product_list_item}>
    //       <div className={styles.product_list_item_header}>
    //         <div className={styles.product_list_pin}>Diet</div>
    //         <div className={styles.product_list_tracker}>Recommended</div>
    //         <Link href="/add-diray">
    //           <div className={styles.product_list_add_btn}>Add</div>
    //         </Link>
    //       </div>
    //       <div className={styles.product_list_item_middle}>
    //         Rice semolina Garnets glute
    //       </div>
    //       <div className={styles.product_list_item_footer}>
    //         <div className={styles.product_list_item_calories}>
    //           Calories:
    //           <span className={styles.product_list_item_span}>340</span>
    //         </div>
    //         <div className={styles.product_list_item_category}>
    //           Category:
    //           <span className={styles.product_list_item_span}>Cereals</span>
    //         </div>
    //         <div className={styles.product_list_item_weight}>
    //           Weight:<span className={styles.product_list_item_span}>100</span>
    //         </div>
    //       </div>
    //     </li>
    //     <li className={styles.product_list_item}>
    //       <div className={styles.product_list_item_header}>
    //         <div className={styles.product_list_pin}>Diet</div>
    //         <div className={styles.product_list_tracker}>Recommended</div>
    //         <div className={styles.product_list_add_btn}>Add</div>
    //       </div>
    //       <div className={styles.product_list_item_middle}>
    //         Rice semolina Garnets glute
    //       </div>
    //       <div className={styles.product_list_item_footer}>
    //         <div className={styles.product_list_item_calories}>
    //           Calories:
    //           <span className={styles.product_list_item_span}>340</span>
    //         </div>
    //         <div className={styles.product_list_item_category}>
    //           Category:
    //           <span className={styles.product_list_item_span}>Cereals</span>
    //         </div>
    //         <div className={styles.product_list_item_weight}>
    //           Weight:<span className={styles.product_list_item_span}>100</span>
    //         </div>
    //       </div>
    //     </li>
    //     <li className={styles.product_list_item}>
    //       <div className={styles.product_list_item_header}>
    //         <div className={styles.product_list_pin}>Diet</div>
    //         <div className={styles.product_list_tracker}>Recommended</div>
    //         <div className={styles.product_list_add_btn}>Add</div>
    //       </div>
    //       <div className={styles.product_list_item_middle}>
    //         Rice semolina Garnets glute
    //       </div>
    //       <div className={styles.product_list_item_footer}>
    //         <div className={styles.product_list_item_calories}>
    //           Calories:
    //           <span className={styles.product_list_item_span}>340</span>
    //         </div>
    //         <div className={styles.product_list_item_category}>
    //           Category:
    //           <span className={styles.product_list_item_span}>Cereals</span>
    //         </div>
    //         <div className={styles.product_list_item_weight}>
    //           Weight:<span className={styles.product_list_item_span}>100</span>
    //         </div>
    //       </div>
    //     </li>
    //     <li className={styles.product_list_item}>
    //       <div className={styles.product_list_item_header}>
    //         <div className={styles.product_list_pin}>Diet</div>
    //         <div className={styles.product_list_tracker}>Recommended</div>
    //         <div className={styles.product_list_add_btn}>Add</div>
    //       </div>
    //       <div className={styles.product_list_item_middle}>
    //         Rice semolina Garnets glute
    //       </div>
    //       <div className={styles.product_list_item_footer}>
    //         <div className={styles.product_list_item_calories}>
    //           Calories:
    //           <span className={styles.product_list_item_span}>340</span>
    //         </div>
    //         <div className={styles.product_list_item_category}>
    //           Category:
    //           <span className={styles.product_list_item_span}>Cereals</span>
    //         </div>
    //         <div className={styles.product_list_item_weight}>
    //           Weight:<span className={styles.product_list_item_span}>100</span>
    //         </div>
    //       </div>
    //     </li>
    //     <li className={styles.product_list_item}>
    //       <div className={styles.product_list_item_header}>
    //         <div className={styles.product_list_pin}>Diet</div>
    //         <div className={styles.product_list_tracker}>Recommended</div>
    //         <div className={styles.product_list_add_btn}>Add</div>
    //       </div>
    //       <div className={styles.product_list_item_middle}>
    //         Rice semolina Garnets glute
    //       </div>
    //       <div className={styles.product_list_item_footer}>
    //         <div className={styles.product_list_item_calories}>
    //           Calories:
    //           <span className={styles.product_list_item_span}>340</span>
    //         </div>
    //         <div className={styles.product_list_item_category}>
    //           Category:
    //           <span className={styles.product_list_item_span}>Cereals</span>
    //         </div>
    //         <div className={styles.product_list_item_weight}>
    //           Weight:<span className={styles.product_list_item_span}>100</span>
    //         </div>
    //       </div>
    //     </li>
    //     <li className={styles.product_list_item}>
    //       <div className={styles.product_list_item_header}>
    //         <div className={styles.product_list_pin}>Diet</div>
    //         <div className={styles.product_list_tracker}>Recommended</div>
    //         <div className={styles.product_list_add_btn}>Add</div>
    //       </div>
    //       <div className={styles.product_list_item_middle}>
    //         Rice semolina Garnets glute
    //       </div>
    //       <div className={styles.product_list_item_footer}>
    //         <div className={styles.product_list_item_calories}>
    //           Calories:
    //           <span className={styles.product_list_item_span}>340</span>
    //         </div>
    //         <div className={styles.product_list_item_category}>
    //           Category:
    //           <span className={styles.product_list_item_span}>Cereals</span>
    //         </div>
    //         <div className={styles.product_list_item_weight}>
    //           Weight:<span className={styles.product_list_item_span}>100</span>
    //         </div>
    //       </div>
    //     </li>
    //     <li className={styles.product_list_item}>
    //       <div className={styles.product_list_item_header}>
    //         <div className={styles.product_list_pin}>Diet</div>
    //         <div className={styles.product_list_tracker}>Recommended</div>
    //         <div className={styles.product_list_add_btn}>Add</div>
    //       </div>
    //       <div className={styles.product_list_item_middle}>
    //         Rice semolina Garnets glute
    //       </div>
    //       <div className={styles.product_list_item_footer}>
    //         <div className={styles.product_list_item_calories}>
    //           Calories:
    //           <span className={styles.product_list_item_span}>340</span>
    //         </div>
    //         <div className={styles.product_list_item_category}>
    //           Category:
    //           <span className={styles.product_list_item_span}>Cereals</span>
    //         </div>
    //         <div className={styles.product_list_item_weight}>
    //           Weight:<span className={styles.product_list_item_span}>100</span>
    //         </div>
    //       </div>
    //     </li>
    //     <li className={styles.product_list_item}>
    //       <div className={styles.product_list_item_header}>
    //         <div className={styles.product_list_pin}>Diet</div>
    //         <div className={styles.product_list_tracker}>Recommended</div>
    //         <div className={styles.product_list_add_btn}>Add</div>
    //       </div>
    //       <div className={styles.product_list_item_middle}>
    //         Rice semolina Garnets glute
    //       </div>
    //       <div className={styles.product_list_item_footer}>
    //         <div className={styles.product_list_item_calories}>
    //           Calories:
    //           <span className={styles.product_list_item_span}>340</span>
    //         </div>
    //         <div className={styles.product_list_item_category}>
    //           Category:
    //           <span className={styles.product_list_item_span}>Cereals</span>
    //         </div>
    //         <div className={styles.product_list_item_weight}>
    //           Weight:<span className={styles.product_list_item_span}>100</span>
    //         </div>
    //       </div>
    //     </li>
    //     <li className={styles.product_list_item}>
    //       <div className={styles.product_list_item_header}>
    //         <div className={styles.product_list_pin}>Diet</div>
    //         <div className={styles.product_list_tracker}>Recommended</div>
    //         <div className={styles.product_list_add_btn}>Add</div>
    //       </div>
    //       <div className={styles.product_list_item_middle}>
    //         Rice semolina Garnets glute
    //       </div>
    //       <div className={styles.product_list_item_footer}>
    //         <div className={styles.product_list_item_calories}>
    //           Calories:
    //           <span className={styles.product_list_item_span}>340</span>
    //         </div>
    //         <div className={styles.product_list_item_category}>
    //           Category:
    //           <span className={styles.product_list_item_span}>Cereals</span>
    //         </div>
    //         <div className={styles.product_list_item_weight}>
    //           Weight:<span className={styles.product_list_item_span}>100</span>
    //         </div>
    //       </div>
    //     </li>
    //     <li className={styles.product_list_item}>
    //       <div className={styles.product_list_item_header}>
    //         <div className={styles.product_list_pin}>Diet</div>
    //         <div className={styles.product_list_tracker}>Recommended</div>
    //         <div className={styles.product_list_add_btn}>Add</div>
    //       </div>
    //       <div className={styles.product_list_item_middle}>
    //         Rice semolina Garnets glute
    //       </div>
    //       <div className={styles.product_list_item_footer}>
    //         <div className={styles.product_list_item_calories}>
    //           Calories:
    //           <span className={styles.product_list_item_span}>340</span>
    //         </div>
    //         <div className={styles.product_list_item_category}>
    //           Category:
    //           <span className={styles.product_list_item_span}>Cereals</span>
    //         </div>
    //         <div className={styles.product_list_item_weight}>
    //           Weight:<span className={styles.product_list_item_span}>100</span>
    //         </div>
    //       </div>
    //     </li>
    //   </ul>
    // </section>
  );
};

export default ProductList;
