'use client';

import { API_BASE_URL } from '@/config/constants';
import { toast } from 'react-hot-toast';

interface RequestOptions extends RequestInit {
  body?: any;
  showToastSuccess?: boolean;
  showToastError?: boolean;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    let token: string | null = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        let errorText = 'Error desconocido';
        try {
          const errorJson = await response.json();
          errorText = errorJson.message || JSON.stringify(errorJson);
        } catch {
          errorText = await response.text();
        }

        throw new Error(errorText);
      }

      const data = await response.json();

      if (options.showToastSuccess) {
        toast.success('Operación exitosa');
      }

      return data;
    } catch (error: any) {
      if (options.showToastError !== false) {
        toast.error(error.message || 'Error en la petición');
      }
      throw error;
    }
  }

  get<T>(endpoint: string, opts: RequestOptions = {}) {
    return this.request<T>(endpoint, { ...opts, method: 'GET' });
  }

  post<T>(endpoint: string, body: any, opts: RequestOptions = {}) {
    return this.request<T>(endpoint, { ...opts, method: 'POST', body });
  }

  put<T>(endpoint: string, body: any, opts: RequestOptions = {}) {
    return this.request<T>(endpoint, { ...opts, method: 'PUT', body });
  }

  delete<T>(endpoint: string, opts: RequestOptions = {}) {
    return this.request<T>(endpoint, { ...opts, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
