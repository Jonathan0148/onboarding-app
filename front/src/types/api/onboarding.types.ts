import { ApiSuccessResponse } from ".";

export interface Onboarding {
  id: string;
  name: string;
  document: string;
  email: string;
  initialAmount: number;
  productId: string;
  status: string;
}

export type GetAllOnboardingResponse = ApiSuccessResponse<Onboarding[]>;
export type GetOnboardingResponse = ApiSuccessResponse<Onboarding>;
export type CreateOnboardingResponse = ApiSuccessResponse<Onboarding>;