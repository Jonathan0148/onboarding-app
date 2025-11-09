import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { SystemMessages } from 'src/common/constants';
import { HealthResponseDto } from './dto/health-response.dto';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  it('should return service health data', async () => {
    const result = await controller.check();

    expect(result.success).toBe(true);
    expect(result.message).toBe(SystemMessages.APP_HEALTH_OK);

    const data = result.data as HealthResponseDto;
    expect(data.status).toBe('ok');
    expect(data).toHaveProperty('timestamp');
  });
});
