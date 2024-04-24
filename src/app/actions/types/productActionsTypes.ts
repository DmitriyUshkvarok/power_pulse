export interface ProductFormData {
  name: string;
  calories: string;
  category: string;
  weight: string;
}

export interface CreateProductSuccessResponse {
  _id: string;
  name: string;
  calories: string;
  category: string;
  weight: string;
  recommended: boolean;
}

export interface ServerError {
  error: string;
  statusCode: number;
}
