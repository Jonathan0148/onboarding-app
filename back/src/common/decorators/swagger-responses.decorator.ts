import { applyDecorators, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
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

export function ApiProductsResponses(model: Type<unknown>, type: 'GET_ALL' | 'GET_ONE' | 'CREATE' | 'UPDATE' | 'DELETE') {
    switch (type) {
        case 'GET_ALL':
            return applyDecorators(
                ApiOkResponse({ description: 'Productos obtenidos exitosamente.', type: [model] }),
            );
        case 'GET_ONE':
            return applyDecorators(
                ApiOkResponse({ description: 'Producto obtenido exitosamente.', type: model }),
                ApiNotFoundResponse({ description: 'Producto no encontrado.' }),
            );
        case 'CREATE':
            return applyDecorators(
                ApiCreatedResponse({ description: 'Producto creado exitosamente.', type: model }),
            );
        case 'UPDATE':
            return applyDecorators(
                ApiOkResponse({ description: 'Producto actualizado exitosamente.', type: model }),
                ApiNotFoundResponse({ description: 'Producto no encontrado para actualizar.' }),
            );
        case 'DELETE':
            return applyDecorators(
                ApiNoContentResponse({ description: 'Producto eliminado exitosamente.' }),
                ApiNotFoundResponse({ description: 'Producto no encontrado para eliminar.' }),
            );
    }
}

export function ApiOnboardingResponses(model: Type<unknown>, type: 'GET_ALL' | 'GET_ONE' | 'CREATE') {
    switch (type) {
        case 'GET_ALL':
            return applyDecorators(
                ApiOkResponse({
                    description: 'Solicitudes de onboarding obtenidas exitosamente.',
                    type: [model],
                }),
            );

        case 'GET_ONE':
            return applyDecorators(
                ApiOkResponse({
                    description: 'Solicitud de onboarding obtenida exitosamente.',
                    type: model,
                }),
                ApiNotFoundResponse({
                    description: 'Solicitud de onboarding no encontrada.',
                }),
            );

        case 'CREATE':
            return applyDecorators(
                ApiCreatedResponse({
                    description: 'Solicitud de onboarding creada exitosamente.',
                    type: model,
                }),
            );
    }
}
