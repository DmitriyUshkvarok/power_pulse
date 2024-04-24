import {
  CreateProductSuccessResponse,
  ServerError,
} from '@/src/app/actions/types/productActionsTypes';

export interface LocalSessionState {
  selectedCategory: string;
  recommendation: string;
  searchText: string;
  productData: CreateProductSuccessResponse[] | ServerError;
  filteredProductData: CreateProductSuccessResponse[] | ServerError;
  dynamicCalories: string;
  previousRouteForRedirect: string | null;
  routingRelatedAuthCompleted: boolean;
  date: string;
  dynamicExercisesPageId: string | number;
  caloriesBurned: number;
  remainingTime: number;
}
