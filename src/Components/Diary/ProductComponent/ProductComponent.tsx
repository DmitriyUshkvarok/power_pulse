import ProductsDiaryList from '../ProductDiaryList/ProductsDiaryList';
interface ProductDiary {
  _id: string;
  title: string;
  category: string;
  calories: string;
  weight: number;
  recommended: boolean;
  date: string;
}

export interface ProductComponentProps {
  productDiaryData: ProductDiary[];
}
const ProductComponent = ({ productDiaryData }: ProductComponentProps) => {
  return (
    <div>
      <ProductsDiaryList productDiaryData={productDiaryData} />
    </div>
  );
};

export default ProductComponent;
