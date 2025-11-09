import { ApiProperty } from '@nestjs/swagger';
import { SwaggerProperties } from 'src/common/constants';

export class HealthResponseDto {
  @ApiProperty({
    example: SwaggerProperties.HEALTH.STATUS.EXAMPLE,
    description: SwaggerProperties.HEALTH.STATUS.DESCRIPTION,
  })
  status: string;

  @ApiProperty({
    example: SwaggerProperties.HEALTH.MESSAGE.EXAMPLE,
    description: SwaggerProperties.HEALTH.MESSAGE.DESCRIPTION,
  })
  message: string;

  @ApiProperty({
    example: SwaggerProperties.HEALTH.TIMESTAMP.EXAMPLE,
    description: SwaggerProperties.HEALTH.TIMESTAMP.DESCRIPTION,
  })
  timestamp: string;
}
