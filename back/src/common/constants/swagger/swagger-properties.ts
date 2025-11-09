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
};
