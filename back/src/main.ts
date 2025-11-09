import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((err) => ({
          field: err.property,
          message: err.constraints
            ? Object.values(err.constraints)[0]
            : 'Validación inválida',
        }));

        return new BadRequestException({
          statusCode: 400,
          message: 'Errores de validación',
          errors: formattedErrors,
        });
      },
    }),
  );

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  logger.log(`🚀 App running on http://localhost:${port}/api`);
}
bootstrap();
