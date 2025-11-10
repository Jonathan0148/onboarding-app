import { apiClient } from './apiClient';
import type { LoginResponse } from '@/types';
import { CreateOnboardingResponse, GetAllOnboardingResponse, GetOnboardingResponse } from '@/types/api/onboarding.types';
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
  getAll: (params?: { page?: number; limit?: number; term?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.term) query.append('term', params.term);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return apiClient.get<GetAllProductsResponse>(`/products${queryString}`);
  },

  getById: (id: string) => apiClient.get<GetProductResponse>(`/products/${id}`),
  create: (data: any) =>
    apiClient.post<CreateProductResponse>('/products', data, {
      showToastSuccess: true,
    }),
  update: (id: string, data: any) =>
    apiClient.put<UpdateProductResponse>(`/products/${id}`, data, {
      showToastSuccess: true,
    }),
  remove: (id: string) =>
    apiClient.delete<DeleteProductResponse>(`/products/${id}`, {
      showToastSuccess: true,
    }),
};

export const OnboardingService = {
  getAll: (params?: { page?: number; limit?: number; term?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', String(params.page));
    if (params?.limit) query.append('limit', String(params.limit));
    if (params?.term) query.append('term', params.term);
    const queryString = query.toString() ? `?${query.toString()}` : '';

    return apiClient.get<GetAllOnboardingResponse>(`/onboarding${queryString}`);
  },

  getById: (id: string) =>
    apiClient.get<GetOnboardingResponse>(`/onboarding/${id}`),

  create: (data: {
    name: string;
    document: string;
    email: string;
    initialAmount: number;
    productId: string;
  }) =>
    apiClient.post<CreateOnboardingResponse>('/onboarding', data, {
      showToastSuccess: true,
      showToastError: true,
    }),
};
