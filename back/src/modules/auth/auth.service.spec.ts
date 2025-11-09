import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpResponseHelper } from 'src/common/helpers/http-responses.helper';
import { AuthConstants } from 'src/common/constants';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(() => {
    jwtService = {
      sign: jest.fn().mockReturnValue('fake-jwt-token'),
    } as any;

    configService = {
      get: jest.fn((key: string) => {
        if (key === AuthConstants.ENV_USERNAME_KEY) return 'admin';
        if (key === AuthConstants.ENV_PASSWORD_KEY) return '1234';
        return null;
      }),
    } as any;

    service = new AuthService(jwtService, configService);
  });

  it('should return a token when credentials are valid', async () => {
    const dto: LoginDto = { username: 'admin', password: '1234' };

    const result = await service.login(dto);

    expect(jwtService.sign).toHaveBeenCalledWith({ username: 'admin' });
    expect(result.success).toBe(true);

    expect(result.success).toBe(true);

    const data = result.data as LoginResponseDto;

    expect(data.access_token).toBe('fake-jwt-token');
  });

  it('should throw unauthorized when credentials are invalid', async () => {
    const dto: LoginDto = { username: 'wrong', password: 'wrong' };

    jest.spyOn(HttpResponseHelper, 'unauthorized').mockImplementation(() => {
      throw new Error('Unauthorized');
    });

    await expect(service.login(dto)).rejects.toThrow('Unauthorized');
  });
});
