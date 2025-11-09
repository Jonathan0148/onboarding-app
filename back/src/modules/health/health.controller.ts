import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HttpStatusCodes } from 'src/common/constants';
import { ApiResponse as ApiResponseType } from 'src/common/interfaces/api-response.interface';
import { HealthResponseDto } from './dto/health-response.dto';
import { SwaggerMessages } from 'src/common/constants';
import { ApiHealthResponses } from 'src/common/decorators/swagger-responses.decorator';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) { }

  @Get()
  @HttpCode(HttpStatusCodes.OK)
  @ApiOperation({ summary: SwaggerMessages.HEALTH.SUMMARY_CHECK })
  @ApiHealthResponses(HealthResponseDto)
  check(): Promise<ApiResponseType<HealthResponseDto>> {
    return this.healthService.check();
  }
}
