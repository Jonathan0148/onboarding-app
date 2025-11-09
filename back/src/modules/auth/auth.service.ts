import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { HttpResponseHelper } from '../../common/helpers/http-responses.helper';
import { HttpSuccessHelper } from 'src/common/helpers/http-success.helper';
import { AuthConstants } from 'src/common/constants';
import { ApiResponse } from 'src/common/interfaces/api-response.interface';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login({ username, password }: LoginDto): Promise<ApiResponse<LoginResponse>> {
    if (!(await this.validateUser(username, password))) {
      throw HttpResponseHelper.unauthorized();
    }

    const payload = { username };
    const token = this.jwtService.sign(payload);

    return HttpSuccessHelper.ok<LoginResponse>(
      { access_token: token }
    );
  }

  private async validateUser(username: string, password: string): Promise<boolean> {
    const validUser = this.configService.get<string>(AuthConstants.ENV_USERNAME_KEY);
    const validPass = this.configService.get<string>(AuthConstants.ENV_PASSWORD_KEY);
    return username === validUser && password === validPass;
  }
}
