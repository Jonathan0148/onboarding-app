import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { HttpSuccessHelper } from '../../common/helpers/http-success.helper';
import { Onboarding } from './entities/onboarding.entity';

describe('OnboardingController', () => {
  let controller: OnboardingController;
  let service: OnboardingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingController],
      providers: [
        {
          provide: OnboardingService,
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OnboardingController>(OnboardingController);
    service = module.get<OnboardingService>(OnboardingService);
  });

  it('should create an onboarding', async () => {
    const dto: CreateOnboardingDto = {
      name: 'Juan',
      document: '123',
      email: 'juan@test.com',
      initialAmount: 1000,
      productId: 'prod-1',
    };
    const mockOnboarding = { onboardingId: 'uuid', ...dto, status: 'REQUESTED' };
    (service.create as jest.Mock).mockResolvedValue(HttpSuccessHelper.created(mockOnboarding));

    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result.data).toEqual(mockOnboarding);
  });

  it('should get all onboardings', async () => {
    const mockOnboardings = [{ onboardingId: '1' }];
    (service.findAll as jest.Mock).mockResolvedValue(HttpSuccessHelper.ok(mockOnboardings));

    const result = await controller.findAll({ page: 1, limit: 10 });
    expect(service.findAll).toHaveBeenCalled();
    expect(result.data).toEqual(mockOnboardings);
  });

  it('should get one onboarding by id', async () => {
    const mockOnboarding = { onboardingId: '1' } as Onboarding;
    (service.findOneById as jest.Mock).mockResolvedValue(HttpSuccessHelper.ok(mockOnboarding));

    const result = await controller.findOneById('1');
    expect(service.findOneById).toHaveBeenCalledWith('1');
    expect(result.data).toEqual(mockOnboarding);
  });
});
