export const SwaggerProperties = {
    AUTH: {
        USERNAME: {
            DESCRIPTION: 'Nombre de usuario que intenta autenticarse',
            EXAMPLE: 'admin',
            MIN_LENGTH: 3,
            MAX_LENGTH: 20,
        },
        PASSWORD: {
            DESCRIPTION: 'Contraseña asociada al usuario',
            EXAMPLE: '12345',
            MIN_LENGTH: 4,
            MAX_LENGTH: 50,
        },
        ACCESS_TOKEN: {
            DESCRIPTION: 'Token JWT generado para el usuario autenticado',
            EXAMPLE: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
    },
    HEALTH: {
        STATUS: {
            EXAMPLE: 'ok',
            DESCRIPTION: 'Estado general del servicio',
        },
        MESSAGE: {
            EXAMPLE: 'Servicio funcionando correctamente',
            DESCRIPTION: 'Mensaje descriptivo sobre el estado del sistema',
        },
        TIMESTAMP: {
            EXAMPLE: '2025-11-09T05:12:47.687Z',
            DESCRIPTION: 'Marca de tiempo en la que se verificó el estado',
        },
    },
    PRODUCTS: {
        NAME: {
            EXAMPLE: 'Cuenta de Ahorros',
            DESCRIPTION: 'Nombre del producto financiero',
            MIN_LENGTH: 3,
            MAX_LENGTH: 50,
        },
        DESCRIPTION: {
            EXAMPLE: 'Cuenta digital sin cuota de manejo',
            DESCRIPTION: 'Descripción del producto financiero',
            MIN_LENGTH: 3,
            MAX_LENGTH: 200,
        },
        RATE: {
            EXAMPLE: 0.5,
            DESCRIPTION: 'Tasa de interés o rentabilidad del producto',
            MIN: 0,
        },
    },
    ONBOARDING: {
        NAME: {
            EXAMPLE: 'Juan Pérez',
            DESCRIPTION: 'Nombre completo del cliente que realiza el proceso de onboarding',
            MIN_LENGTH: 3,
            MAX_LENGTH: 80,
        },
        DOCUMENT: {
            EXAMPLE: '1020304050',
            DESCRIPTION: 'Número de documento de identidad del cliente',
            MIN_LENGTH: 5,
            MAX_LENGTH: 20,
        },
        EMAIL: {
            EXAMPLE: 'juan.perez@correo.com',
            DESCRIPTION: 'Correo electrónico del cliente para notificaciones y contacto',
        },
        INITIAL_AMOUNT: {
            EXAMPLE: 50000,
            DESCRIPTION: 'Monto inicial con el que el cliente desea abrir el producto financiero',
            MIN: 0,
        },
        PRODUCT_ID: {
            EXAMPLE: 'c2eec5a5-8d25-4b62-9d47-bcbf34b132ce',
            DESCRIPTION: 'Identificador único del producto que el cliente desea abrir',
        },
    },
};
