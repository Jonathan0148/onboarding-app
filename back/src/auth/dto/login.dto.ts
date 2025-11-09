import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ValidationMessages } from '../../common/constants/validation-messages';

export class LoginDto {
  @IsString({ message: ValidationMessages.INVALID_TYPE })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @MinLength(3, { message: ValidationMessages.MIN_LENGTH })
  @MaxLength(20, { message: ValidationMessages.MAX_LENGTH })
  username: string;

  @IsString({ message: ValidationMessages.INVALID_TYPE })
  @IsNotEmpty({ message: ValidationMessages.REQUIRED })
  @MinLength(4, { message: ValidationMessages.MIN_LENGTH })
  @MaxLength(50, { message: ValidationMessages.MAX_LENGTH })
  password: string;
}
