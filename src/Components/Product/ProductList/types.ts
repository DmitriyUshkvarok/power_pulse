import {
  CreateProductSuccessResponse,
  ServerError,
} from '@/src/app/actions/types/productActionsTypes';

export interface ProductPageComponentProps {
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
