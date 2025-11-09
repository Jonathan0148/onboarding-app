import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HttpStatusCodes } from '../constants';
import { DefaultMessages } from '../constants';

export function ApiAuthResponses(type?: Type<unknown>) {
    return applyDecorators(
        ApiResponse({
            status: HttpStatusCodes.OK,
            description: DefaultMessages.SUCCESS_OPERATION,
            type,
        }),
        ApiResponse({
            status: HttpStatusCodes.UNAUTHORIZED,
            description: DefaultMessages.DEFAULT_UNAUTHORIZED,
        }),
    );
}

export const ApiHealthResponses = (type: any) => {
    return applyDecorators(
        ApiResponse({
            status: HttpStatusCodes.OK,
            description: DefaultMessages.SERVICE_SUCCESS,
            type,
        }),
    );
};