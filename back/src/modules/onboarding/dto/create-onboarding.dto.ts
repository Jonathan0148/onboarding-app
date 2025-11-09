import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';
import { ValidationMessages, SwaggerProperties } from '../../../common/constants';

export class CreateOnboardingDto {
  @ApiProperty({
    example: SwaggerProperties.ONBOARDING.NAME.EXAMPLE,
    description: SwaggerProperties.ONBOARDING.NAME.DESCRIPTION,
    minLength: SwaggerProperties.ONBOARDING.NAME.MIN_LENGTH,
    maxLength: SwaggerProperties.ONBOARDING.NAME.MAX_LENGTH,
  })
  @IsString({ message: ValidationMessages.INVALID_TYPE })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @MinLength(SwaggerProperties.ONBOARDING.NAME.MIN_LENGTH, {
    message: ValidationMessages.MIN_LENGTH,
  })
  @MaxLength(SwaggerProperties.ONBOARDING.NAME.MAX_LENGTH, {
    message: ValidationMessages.MAX_LENGTH,
  })
  name: string;

  @ApiProperty({
    example: SwaggerProperties.ONBOARDING.DOCUMENT.EXAMPLE,
    description: SwaggerProperties.ONBOARDING.DOCUMENT.DESCRIPTION,
    minLength: SwaggerProperties.ONBOARDING.DOCUMENT.MIN_LENGTH,
    maxLength: SwaggerProperties.ONBOARDING.DOCUMENT.MAX_LENGTH,
  })
  @IsString({ message: ValidationMessages.INVALID_TYPE })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @MinLength(SwaggerProperties.ONBOARDING.DOCUMENT.MIN_LENGTH, {
    message: ValidationMessages.MIN_LENGTH,
  })
  @MaxLength(SwaggerProperties.ONBOARDING.DOCUMENT.MAX_LENGTH, {
    message: ValidationMessages.MAX_LENGTH,
  })
  document: string;

  @ApiProperty({
    example: SwaggerProperties.ONBOARDING.EMAIL.EXAMPLE,
    description: SwaggerProperties.ONBOARDING.EMAIL.DESCRIPTION,
  })
  @IsEmail({}, { message: ValidationMessages.INVALID_EMAIL })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  email: string;

  @ApiProperty({
    example: SwaggerProperties.ONBOARDING.INITIAL_AMOUNT.EXAMPLE,
    description: SwaggerProperties.ONBOARDING.INITIAL_AMOUNT.DESCRIPTION,
    minimum: SwaggerProperties.ONBOARDING.INITIAL_AMOUNT.MIN,
  })
  @IsNumber({}, { message: ValidationMessages.INVALID_TYPE })
  @Min(SwaggerProperties.ONBOARDING.INITIAL_AMOUNT.MIN, {
    message: ValidationMessages.MIN_VALUE,
  })
  initialAmount: number;

  @ApiProperty({
    example: SwaggerProperties.ONBOARDING.PRODUCT_ID.EXAMPLE,
    description: SwaggerProperties.ONBOARDING.PRODUCT_ID.DESCRIPTION,
  })
  @IsUUID('4', { message: ValidationMessages.INVALID_UUID })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  productId: string;
}
