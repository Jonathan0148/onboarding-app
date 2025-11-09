import { apiClient } from './apiClient';
import type { LoginResponse } from '@/types';
import type {
  GetAllProductsResponse,
  GetProductResponse,
  CreateProductResponse,
  UpdateProductResponse,
  DeleteProductResponse,
} from '@/types/api/products.types';

export const AuthService = {
  login: (username: string, password: string) =>
    apiClient.post<LoginResponse>('/auth/login', { username, password }, {
      showToastSuccess: true,
      showToastError: true,
    }),
};

export const ProductsService = {
  getAll: () => apiClient.get<GetAllProductsResponse>('/products'),
  getById: (id: string) => apiClient.get<GetProductResponse>(`/products/${id}`),
  create: (data: any) => apiClient.post<CreateProductResponse>('/products', data, {
    showToastSuccess: true,
  }),
  update: (id: string, data: any) => apiClient.put<UpdateProductResponse>(`/products/${id}`, data, {
    showToastSuccess: true,
  }),
  remove: (id: string) => apiClient.delete<DeleteProductResponse>(`/products/${id}`, {
    showToastSuccess: true,
  }),
};
