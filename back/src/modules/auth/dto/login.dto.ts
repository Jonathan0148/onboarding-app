import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ValidationMessages } from '../../../common/constants';
import { SwaggerProperties } from '../../../common/constants';

export class LoginDto {
  @ApiProperty({
    example: SwaggerProperties.AUTH.USERNAME.EXAMPLE,
    description: SwaggerProperties.AUTH.USERNAME.DESCRIPTION,
    minLength: SwaggerProperties.AUTH.USERNAME.MIN_LENGTH,
    maxLength: SwaggerProperties.AUTH.USERNAME.MAX_LENGTH,
  })
  @IsString({ message: ValidationMessages.INVALID_TYPE })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @MinLength(SwaggerProperties.AUTH.USERNAME.MIN_LENGTH, { message: ValidationMessages.MIN_LENGTH })
  @MaxLength(SwaggerProperties.AUTH.USERNAME.MAX_LENGTH, { message: ValidationMessages.MAX_LENGTH })
  username: string;

  @ApiProperty({
    example: SwaggerProperties.AUTH.PASSWORD.EXAMPLE,
    description: SwaggerProperties.AUTH.PASSWORD.DESCRIPTION,
    minLength: SwaggerProperties.AUTH.PASSWORD.MIN_LENGTH,
    maxLength: SwaggerProperties.AUTH.PASSWORD.MAX_LENGTH,
  })
  @IsString({ message: ValidationMessages.INVALID_TYPE })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @MinLength(SwaggerProperties.AUTH.PASSWORD.MIN_LENGTH, { message: ValidationMessages.MIN_LENGTH })
  @MaxLength(SwaggerProperties.AUTH.PASSWORD.MAX_LENGTH, { message: ValidationMessages.MAX_LENGTH })
  password: string;
}
