import { ApiSuccessResponse } from './index';

export interface AuthData {
  access_token: string;
}

export type LoginResponse = ApiSuccessResponse<AuthData>;
