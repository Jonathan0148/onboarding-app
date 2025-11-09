import { BadRequestException, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { HttpStatusCodes, HttpErrorCodes } from '../constants';
import { DefaultMessages } from '../constants';

export class HttpResponseHelper {
  static validationError(errors: any[]) {
    return new BadRequestException({
      statusCode: HttpStatusCodes.BAD_REQUEST,
      code: HttpErrorCodes.VALIDATION_ERROR,
      message: DefaultMessages.DEFAULT_VALIDATION_ERROR,
      errors,
    });
  }

  static unauthorized(message = DefaultMessages.DEFAULT_UNAUTHORIZED) {
    return new UnauthorizedException({
      statusCode: HttpStatusCodes.UNAUTHORIZED,
      code: HttpErrorCodes.UNAUTHORIZED,
      message,
    });
  }

  static notFound(message = DefaultMessages.DEFAULT_NOT_FOUND) {
    return new NotFoundException({
      statusCode: HttpStatusCodes.NOT_FOUND,
      code: HttpErrorCodes.NOT_FOUND,
      message,
    });
  }

  static internalError(message = DefaultMessages.DEFAULT_INTERNAL_ERROR) {
    return new InternalServerErrorException({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      code: HttpErrorCodes.INTERNAL_SERVER_ERROR,
      message,
    });
  }
}
