import {
  CreateProductSuccessResponse,
  ServerError,
} from '@/src/app/actions/types/productActionsTypes';

export interface ProductPageComponentProps {
  productData: CreateProductSuccessResponse[] | ServerError;
}
