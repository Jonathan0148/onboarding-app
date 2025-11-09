import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingService } from './onboarding.service';
import { InMemoryOnboardingRepository } from './repositories/in-memory-onboarding.repository';
import { InMemoryProductsRepository } from '../products/repositories/in-memory-products.repository';
import { HttpResponseHelper } from '../../common/helpers/http-responses.helper';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { RepositoryProviders } from 'src/common/constants/domains/repositories.constants';

describe('OnboardingService', () => {
  let service: OnboardingService;
  let repository: InMemoryOnboardingRepository;
  let productsRepository: InMemoryProductsRepository;

  beforeEach(async () => {
    repository = new InMemoryOnboardingRepository();
    productsRepository = new InMemoryProductsRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnboardingService,
        {
          provide: RepositoryProviders.REPOSITORY,
          useValue: repository,
        },
        {
          provide: InMemoryProductsRepository,
          useValue: productsRepository,
        },
      ],
    }).compile();

    service = module.get<OnboardingService>(OnboardingService);
  });

  it('should create a new onboarding', async () => {
    const { data: products } = await productsRepository.findAll();
    const dto: CreateOnboardingDto = {
      name: 'Juan Pérez',
      document: '123456',
      email: 'juan@correo.com',
      initialAmount: 1000,
      productId: products[0].id,
    };

    const result = await service.create(dto);

    expect(result.success).toBe(true);
    expect(result.data!.status).toBe('REQUESTED');
  });

  it('should throw error if product does not exist', async () => {
    jest.spyOn(HttpResponseHelper, 'notFound').mockImplementation(() => {
      throw new Error('Producto no encontrado');
    });

    const dto: CreateOnboardingDto = {
      name: 'Pedro',
      document: '123',
      email: 'pedro@test.com',
      initialAmount: 100,
      productId: 'fake-id',
    };

    await expect(service.create(dto)).rejects.toThrow('Producto no encontrado');
  });

  it('should find all onboardings paginated', async () => {
    const { data: products } = await productsRepository.findAll();
    const dto: CreateOnboardingDto = {
      name: 'Laura Gómez',
      document: '987654',
      email: 'laura@correo.com',
      initialAmount: 2000,
      productId: products[0].id,
    };

    await service.create(dto);
    const result = await service.findAll({ page: 1, limit: 10 });

    expect(result.data!.length).toBeGreaterThan(0);
    expect(result.meta).toHaveProperty('totalItems');
  });

  it('should find one onboarding by id', async () => {
    const { data: products } = await productsRepository.findAll();
    const dto: CreateOnboardingDto = {
      name: 'Carlos Ruiz',
      document: '654321',
      email: 'carlos@correo.com',
      initialAmount: 5000,
      productId: products[0].id,
    };

    const { data } = await service.create(dto);
    const result = await service.findOneById(data!.onboardingId);

    expect(result.data!.onboardingId).toBe(data!.onboardingId);
  });
});
