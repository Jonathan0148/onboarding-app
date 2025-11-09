import { Inject, Injectable } from '@nestjs/common';
import { OnboardingRepository } from './repositories/onboarding.repository.interface';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { Onboarding } from './entities/onboarding.entity';
import { RepositoryProviders } from 'src/common/constants/domains/repositories.constants';
import { HttpResponseHelper } from 'src/common/helpers/http-responses.helper';
import { HttpSuccessHelper } from 'src/common/helpers/http-success.helper';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { InMemoryProductsRepository } from '../products/repositories/in-memory-products.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class OnboardingService {
  constructor(
    @Inject(RepositoryProviders.REPOSITORY)
    private readonly repository: OnboardingRepository,
    private readonly productsRepository: InMemoryProductsRepository,
  ) { }

  async create(dto: CreateOnboardingDto): Promise<ApiResponse<Onboarding>> {
    const product = await this.productsRepository.findOneById(dto.productId);
    if (!product) throw HttpResponseHelper.notFound({ resource: 'Producto', id: dto.productId });

    const onboarding = await this.repository.create(dto);
    return HttpSuccessHelper.created(onboarding, 'Onboarding creado exitosamente.');
  }

  async findAll(pagination?: PaginationDto): Promise<ApiResponse<Onboarding[]>> {
    const { page = 1, limit = 10, term } = pagination || {};

    const { data, total } = await this.repository.findAll(page, limit, term);

    const meta = {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      limit,
      ...(term ? { filter: term } : {}),
    };

    return HttpSuccessHelper.ok(
      data,
      term
        ? `Solicitudes de onboarding filtradas por "${term}" obtenidas exitosamente.`
        : 'Solicitudes de onboarding obtenidas exitosamente.',
      meta,
    );
  }

  async findOneById(id: string): Promise<ApiResponse<Onboarding>> {
    const onboarding = await this.repository.findOneById(id);
    if (!onboarding) throw HttpResponseHelper.notFound({ resource: 'Onboarding', id });
    return HttpSuccessHelper.ok(onboarding);
  }
}
