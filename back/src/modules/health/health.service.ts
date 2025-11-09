import { Injectable } from '@nestjs/common';
import { HttpSuccessHelper } from 'src/common/helpers/http-success.helper';
import { HealthResponseDto } from './dto/health-response.dto';
import { SystemMessages } from 'src/common/constants';
import { ApiResponse as ApiResponseType } from 'src/common/interfaces/api-response.interface';

@Injectable()
export class HealthService {
    async check(): Promise<ApiResponseType<HealthResponseDto>> {
        const data: HealthResponseDto = {
            status: 'ok',
            message: SystemMessages.APP_HEALTH_OK,
            timestamp: new Date().toISOString(),
        };

        return HttpSuccessHelper.ok(data, SystemMessages.APP_HEALTH_OK);
    }
}
