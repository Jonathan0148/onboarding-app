import { Onboarding } from '../entities/onboarding.entity';
import { CreateOnboardingDto } from '../dto/create-onboarding.dto';

export interface OnboardingRepository {
  findAll(page?: number, limit?: number, term?: string): Promise<{ data: Onboarding[]; total: number }>;
  findOneById(id: string): Promise<Onboarding | null>;
  create(data: CreateOnboardingDto): Promise<Onboarding>;
}
