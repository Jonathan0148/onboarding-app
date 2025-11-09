import { Module } from '@nestjs/common';

import { AuthModule, HealthModule, OnboardingModule, ProductsModule } from './modules';
import { ConfigAppModule } from '../config/config.module';

@Module({
  imports: [
    ConfigAppModule,
    AuthModule,
    ProductsModule,
    OnboardingModule,
    HealthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
