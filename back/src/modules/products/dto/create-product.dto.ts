import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, MaxLength, MinLength } from 'class-validator';
import { ValidationMessages, SwaggerProperties } from '../../../common/constants';

export class CreateProductDto {
  @ApiProperty({
    example: SwaggerProperties.PRODUCTS.NAME.EXAMPLE,
    description: SwaggerProperties.PRODUCTS.NAME.DESCRIPTION,
    minLength: SwaggerProperties.PRODUCTS.NAME.MIN_LENGTH,
    maxLength: SwaggerProperties.PRODUCTS.NAME.MAX_LENGTH,
  })
  @IsString({ message: ValidationMessages.INVALID_TYPE })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @MinLength(SwaggerProperties.PRODUCTS.NAME.MIN_LENGTH, { message: ValidationMessages.MIN_LENGTH })
  @MaxLength(SwaggerProperties.PRODUCTS.NAME.MAX_LENGTH, { message: ValidationMessages.MAX_LENGTH })
  name: string;

  @ApiProperty({
    example: SwaggerProperties.PRODUCTS.DESCRIPTION.EXAMPLE,
    description: SwaggerProperties.PRODUCTS.DESCRIPTION.DESCRIPTION,
    minLength: SwaggerProperties.PRODUCTS.DESCRIPTION.MIN_LENGTH,
    maxLength: SwaggerProperties.PRODUCTS.DESCRIPTION.MAX_LENGTH,
  })
  @IsString({ message: ValidationMessages.INVALID_TYPE })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @MinLength(SwaggerProperties.PRODUCTS.DESCRIPTION.MIN_LENGTH, { message: ValidationMessages.MIN_LENGTH })
  @MaxLength(SwaggerProperties.PRODUCTS.DESCRIPTION.MAX_LENGTH, { message: ValidationMessages.MAX_LENGTH })
  description: string;

  @ApiProperty({
    example: SwaggerProperties.PRODUCTS.RATE.EXAMPLE,
    description: SwaggerProperties.PRODUCTS.RATE.DESCRIPTION,
    minimum: SwaggerProperties.PRODUCTS.RATE.MIN,
  })
  @IsNumber({}, { message: ValidationMessages.INVALID_TYPE })
  @Min(SwaggerProperties.PRODUCTS.RATE.MIN, { message: ValidationMessages.MIN_VALUE })
  rate: number;
}
