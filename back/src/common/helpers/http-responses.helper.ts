import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { HttpStatusCodes, HttpErrorCodes } from '../constants';
import { DefaultMessages } from '../constants';

interface NotFoundContext {
  resource?: string;
  id?: string;
  message?: string;
}

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

  static forbidden(message = DefaultMessages.DEFAULT_FORBIDDEN) {
    return new ForbiddenException({
      statusCode: HttpStatusCodes.FORBIDDEN,
      code: DefaultMessages.DEFAULT_FORBIDDEN,
      message,
    });
  }

  static notFound(context?: NotFoundContext) {
    let message = DefaultMessages.DEFAULT_NOT_FOUND;

    if (context?.message) {
      message = context.message;
    } else if (context?.resource && context?.id) {
      message = `${context.resource} con ID ${context.id} no encontrado.`;
    } else if (context?.resource) {
      message = `${context.resource} no encontrado.`;
    }

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
