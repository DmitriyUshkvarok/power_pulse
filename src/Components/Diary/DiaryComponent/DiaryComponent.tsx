import DaySwitch from '../../UI/DaySwitch/DaySwitch';
import ProductComponent from '../ProductComponent/ProductComponent';

export interface ProductDiary {
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

const DiaryComponent = () => {
  return (
    <>
      <DaySwitch />
      <ProductComponent />
    </>
  );
};

export default DiaryComponent;
