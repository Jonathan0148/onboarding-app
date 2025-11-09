import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationPipe, ValidationError, Logger, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpResponseHelper } from '../helpers/http-responses.helper';
import { DefaultMessages, SystemMessages } from '../constants';
import { setupSwagger } from './setup-swagger';

/**
 * Configura e inicializa la aplicación Nest con las dependencias globales
 * Separa la infraestructura del entrypoint (main.ts)
 */
export async function createApp(): Promise<{ app: INestApplication; port: number }> {
    const logger = new Logger('Bootstrap');

    // Determinar entorno actual
    const nodeEnv = process.env.NODE_ENV ?? 'development';
    const envFilePath = `.env.${nodeEnv}`;

    logger.log(`Entorno detectado: ${nodeEnv}`);
    logger.log(`Archivo de entorno: ${envFilePath}`);

    // Crear la app principal
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // CORS y prefijo global    
    app.enableCors({
        origin: ['http://localhost:4000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.setGlobalPrefix('api');

    // Docs Swagger
    setupSwagger(app);

    // Validaciones globales
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            stopAtFirstError: true,
            exceptionFactory: (errors: ValidationError[]) => {
                const formattedErrors = errors.map((err) => ({
                    field: err.property,
                    message: err.constraints
                        ? Object.values(err.constraints)[0]
                        : DefaultMessages.DEFAULT_VALIDATION_ERROR,
                }));
                return HttpResponseHelper.validationError(formattedErrors);
            },
        }),
    );

    // Log de arranque
    const port = configService.get<number>('PORT') ?? 3000;
    logger.log(SystemMessages.APP_RUNNING(port));

    return { app, port };
}
