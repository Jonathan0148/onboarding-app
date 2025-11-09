import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Onboarding } from '../entities/onboarding.entity';
import { CreateOnboardingDto } from '../dto/create-onboarding.dto';
import { OnboardingRepository } from './onboarding.repository.interface';

@Injectable()
export class InMemoryOnboardingRepository implements OnboardingRepository {
  private readonly logger = new Logger(InMemoryOnboardingRepository.name);
  private onboardings: Onboarding[] = [];

  async findAll(page = 1, limit = 10, term?: string): Promise<{ data: Onboarding[]; total: number }> {
    const offset = (page - 1) * limit;

    let filtered = this.onboardings;

    if (term) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.name.toLowerCase().includes(lowerTerm) ||
          o.document.includes(lowerTerm) ||
          o.email.toLowerCase().includes(lowerTerm),
      );
    }

    const total = filtered.length;
    const data = filtered.slice(offset, offset + limit);

    this.logger.debug(`Returning ${data.length} onboardings (page ${page})`);
    return { data, total };
  }

  async findOneById(id: string): Promise<Onboarding | null> {
    return this.onboardings.find((o) => o.onboardingId === id) ?? null;
  }

  async create(data: CreateOnboardingDto): Promise<Onboarding> {
    const onboarding: Onboarding = {
      onboardingId: randomUUID(),
      ...data,
      status: 'REQUESTED',
      createdAt: new Date(),
    };
    this.onboardings.push(onboarding);
    this.logger.debug(`Onboarding ${onboarding.onboardingId} created in memory.`);
    return onboarding;
  }
}
