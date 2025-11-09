export const SwaggerMessages = {
    GLOBAL: {
        TITLE: 'Onboarding API',
        DESCRIPTION: 'API para el flujo de registro y autenticación de clientes del banco digital',
        VERSION: '1.0.0',
    },
    AUTH: {
        SUMMARY_LOGIN: 'Autentica al usuario y genera un token JWT válido por 5 minutos',
    },
    HEALTH: {
        SUMMARY_CHECK: 'Verifica el estado del servicio',
    },
    PRODUCTS: {
        SUMMARY_GET_ALL: 'Obtiene el listado de todos los productos disponibles.',
        SUMMARY_GET_ONE: 'Obtiene la información de un producto por su ID.',
        SUMMARY_CREATE: 'Crea un nuevo producto en el sistema.',
        SUMMARY_UPDATE: 'Actualiza un producto existente.',
        SUMMARY_DELETE: 'Elimina un producto por su ID.',
    },
};
