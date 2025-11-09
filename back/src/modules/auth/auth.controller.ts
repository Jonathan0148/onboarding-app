import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { HttpStatusCodes } from 'src/common/constants';
import { ApiResponse as ApiResponseType } from 'src/common/interfaces/api-response.interface';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiAuthResponses } from 'src/common/decorators/swagger-responses.decorator';
import { SwaggerMessages } from 'src/common/constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatusCodes.OK)
  @ApiOperation({ summary: SwaggerMessages.AUTH.SUMMARY_LOGIN })
  @ApiAuthResponses(LoginResponseDto)
  async login(@Body() body: LoginDto): Promise<ApiResponseType<LoginResponseDto>> {
    return this.authService.login(body);
  }
}
