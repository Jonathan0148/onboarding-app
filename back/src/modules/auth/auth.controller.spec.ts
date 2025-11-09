import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { HttpSuccessHelper } from 'src/common/helpers/http-success.helper';
import { LoginResponseDto } from './dto/login-response.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should call AuthService.login and return token', async () => {
    const dto: LoginDto = { username: 'admin', password: '1234' };
    const fakeResponse = HttpSuccessHelper.ok({ access_token: 'fake-jwt-token' });

    (service.login as jest.Mock).mockResolvedValue(fakeResponse);

    const result = await controller.login(dto);

    expect(service.login).toHaveBeenCalledWith(dto);
    expect(result.success).toBe(true);
    const data = result.data as LoginResponseDto;
    expect(data.access_token).toBe('fake-jwt-token');
  });
});
