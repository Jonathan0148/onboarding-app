import { ApiProperty } from '@nestjs/swagger';
import { SwaggerProperties } from 'src/common/constants';

export class LoginResponseDto {
  @ApiProperty({
    example: SwaggerProperties.AUTH.ACCESS_TOKEN.EXAMPLE,
    description: SwaggerProperties.AUTH.ACCESS_TOKEN.DESCRIPTION,
  })
  access_token: string;
}
