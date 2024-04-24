export interface ProductTypeRedux {
  _id: string;
  name: string;
  calories: string;
  category: string;
  weight: string;
  recommended: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ProductState {
  selectedProduct: ProductTypeRedux | null;
}
