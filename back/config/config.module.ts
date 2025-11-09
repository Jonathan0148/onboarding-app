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
                path.resolve(process.cwd(), `config/env/.env.${process.env.NODE_ENV || 'development'}`),
            ],
            validationSchema: Joi.object({
                PORT: Joi.number().default(3000),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION: Joi.alternatives().try(Joi.string(), Joi.number()).default('300s'),
                AUTH_USERNAME: Joi.string().default('admin'),
                AUTH_PASSWORD: Joi.string().default('1234'),
            }),
        }),
    ],
})
export class ConfigAppModule { }
