import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Onboarding } from '../entities/onboarding.entity';
import { CreateOnboardingDto } from '../dto/create-onboarding.dto';
import { OnboardingRepository } from './onboarding.repository.interface';
import { InMemoryProductsRepository } from '../../products/repositories/in-memory-products.repository';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class InMemoryOnboardingRepository implements OnboardingRepository {
  private readonly logger = new Logger(InMemoryOnboardingRepository.name);
  private onboardings: Onboarding[] = [];
  private products: Product[] = [];

  constructor() {
    const productRepo = new InMemoryProductsRepository();
    this.products = (productRepo as any).products ?? [];
    this.logger.debug(`Onboarding repo cargó ${this.products.length} productos en memoria.`);
  }

  async findAll(
    page = 1,
    limit = 10,
    term?: string,
  ): Promise<{ data: (Onboarding & { productName?: string })[]; total: number }> {
    const offset = (page - 1) * limit;
    let filtered = this.onboardings;

    if (term) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter((o) => {
        const product = this.products.find((p) => p.id === o.productId);
        const productName = product?.name?.toLowerCase() || '';
        return (
          o.name.toLowerCase().includes(lowerTerm) ||
          o.document.includes(lowerTerm) ||
          o.email.toLowerCase().includes(lowerTerm) ||
          productName.includes(lowerTerm)
        );
      });
    }

    const total = filtered.length;

    const data = filtered.slice(offset, offset + limit).map((o) => {
      const product = this.products.find((p) => p.id === o.productId);
      return {
        ...o,
        productName: product?.name || '(Sin producto)',
      };
    });

    this.logger.debug(`Returning ${data.length} onboardings (page ${page}) with productName`);
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
