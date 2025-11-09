import { DefaultMessages } from '../constants';
import { HttpStatusCodes } from '../constants';
import { ApiResponse } from '../interfaces/api-response.interface';

export class HttpSuccessHelper {
  static ok<T>(data: T, message = DefaultMessages.SUCCESS_OPERATION): ApiResponse<T> {
    return {
      statusCode: HttpStatusCodes.OK,
      success: true,
      message,
      data,
    };
  }

  static created<T>(data: T, message = DefaultMessages.SUCCESS_CREATED): ApiResponse<T> {
    return {
      statusCode: HttpStatusCodes.CREATED,
      success: true,
      message,
      data,
    };
  }

  static noContent(message = DefaultMessages.SUCCESS_NO_CONTENT): ApiResponse<null> {
    return {
      statusCode: HttpStatusCodes.NO_CONTENT,
      success: true,
      message,
      data: null,
    };
  }
}
