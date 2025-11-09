export interface ApiSuccessResponse<T> {
  statusCode: number;
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiErrorResponse {
  statusCode: number;
  success?: false;
  code?: string;
  message: string;
}

export interface PaginationMeta {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}
