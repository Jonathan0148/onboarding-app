import { ApiSuccessResponse, ApiErrorResponse } from './index';

export interface Product {
  id: string;
  name: string;
  description: string;
  rate: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  rate: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export type GetAllProductsResponse = ApiSuccessResponse<Product[]>;
export type GetProductResponse = ApiSuccessResponse<Product> | ApiErrorResponse;
export type CreateProductResponse = ApiSuccessResponse<Product>;
export type UpdateProductResponse = ApiSuccessResponse<Product>;
export type DeleteProductResponse = ApiSuccessResponse<null>;
