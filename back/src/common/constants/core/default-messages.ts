export const DefaultMessages = {
  // Errores genéricos
  DEFAULT_VALIDATION_ERROR: 'Error de validación en los datos proporcionados.',
  DEFAULT_UNAUTHORIZED: 'Credenciales inválidas o token no autorizado.',
  DEFAULT_NOT_FOUND: 'Recurso no encontrado.',
  DEFAULT_INTERNAL_ERROR: 'Error interno del servidor.',
  DEFAULT_FORBIDDEN: 'Acceso denegado. No tiene permisos para esta acción.',

  // Éxitos genéricos
  SUCCESS_OPERATION: 'Operación exitosa.',
  SUCCESS_CREATED: 'Recurso creado exitosamente.',
  SUCCESS_NO_CONTENT: 'Sin contenido disponible.',
  SERVICE_SUCCESS: 'El servicio está activo.',

  // Mensajes específicos por dominio (para Swagger y Helpers)
  AUTH: {
    LOGIN_SUCCESS: 'Inicio de sesión exitoso.',
    INVALID_CREDENTIALS: 'Usuario o contraseña incorrectos.',
  },

  PRODUCTS: {
    FETCHED_ALL: 'Productos obtenidos exitosamente.',
    FETCHED_ONE: 'Producto obtenido exitosamente.',
    CREATED: 'Producto creado exitosamente.',
    UPDATED: 'Producto actualizado exitosamente.',
    DELETED: 'Producto eliminado exitosamente.',
    NOT_FOUND: 'Producto no encontrado.',
  },

  ONBOARDING: {
    CREATED: 'Onboarding creado exitosamente.',
    VALIDATION_FAILED: 'Los datos del onboarding no son válidos.',
    NOT_FOUND: 'Registro de onboarding no encontrado.',
  },
};
