export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    filter?: string;
  };
}
