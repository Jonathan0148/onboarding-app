import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import * as path from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                path.resolve(process.cwd(), 'config/env/.env'),
                path.resolve(
                    process.cwd(),
                    `config/env/.env.${process.env.NODE_ENV || 'development'}`,
                ),
            ],
            validationSchema: Joi.object({
                // Configuración general
                PORT: Joi.number().default(3000),

                // Seguridad / JWT
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION: Joi.alternatives()
                    .try(Joi.string(), Joi.number())
                    .default('5m'),

                // Autenticación básica simulada
                AUTH_USERNAME: Joi.string().default('admin'),
                AUTH_PASSWORD: Joi.string().default('12345'),

                // Selección dinámica de repositorio
                PRODUCTS_REPOSITORY: Joi.string()
                    .valid('memory', 'sqlite')
                    .default('memory'),
            }),
        }),
    ],
})
export class ConfigAppModule { }
