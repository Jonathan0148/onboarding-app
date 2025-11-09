import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ProductsModule,
    OnboardingModule,
    HealthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
