import { HealthResponseDto } from './dto/health-response.dto';
import { HealthService } from './health.service';
import { SystemMessages } from 'src/common/constants';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(() => {
    service = new HealthService();
  });

  it('should return health check response correctly', async () => {
    const result = await service.check();

    expect(result.success).toBe(true);
    expect(result.message).toBe(SystemMessages.APP_HEALTH_OK);

    const data = result.data as HealthResponseDto;
    expect(data.status).toBe('ok');
    expect(data).toHaveProperty('timestamp');
  });
});