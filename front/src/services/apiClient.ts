'use client';

import { API_BASE_URL } from '@/config/constants';
import { toast } from 'react-hot-toast';

interface RequestOptions extends RequestInit {
  body?: any;
  showToastSuccess?: boolean;
  showToastError?: boolean;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const token = getCookie('token');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
      if (response.status === 401) {
        toast.error('Sesión expirada o no autorizada. Inicia sesión nuevamente.');
        if (typeof window !== 'undefined') {
          document.cookie = 'token=; Max-Age=0; path=/;';
          window.location.replace('/login');
        }
        throw new Error('No autorizado');
      }

      if (!response.ok) {
        let errorMsg = 'Error desconocido';
        try {
          const errorJson = await response.json();
          errorMsg = errorJson.message || JSON.stringify(errorJson);
        } catch {
          errorMsg = await response.text();
        }

        if (options.showToastError !== false) {
          toast.error(errorMsg);
        }

        throw new Error(errorMsg);
      }

      const data = await response.json();

      if (options.showToastSuccess) {
        const message = data?.message || 'Operación exitosa';
        toast.success(message);
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
