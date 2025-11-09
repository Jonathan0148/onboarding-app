import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { SqliteOnboardingRepository } from './repositories/sqlite-onboarding.repository';
import { InMemoryOnboardingRepository } from './repositories/in-memory-onboarding.repository';
import { RepositoryProviders } from 'src/common/constants/domains/repositories.constants';
import { InMemoryProductsRepository } from '../products/repositories/in-memory-products.repository';

@Module({
  controllers: [OnboardingController],
  providers: [
    OnboardingService,
    InMemoryProductsRepository,
    {
      provide: RepositoryProviders.REPOSITORY,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const repoType = config.get<string>(RepositoryProviders.REPOSITORY);
        return repoType === 'sqlite'
          ? new SqliteOnboardingRepository()
          : new InMemoryOnboardingRepository();
      },
    },
  ],
  exports: [RepositoryProviders.REPOSITORY],
})
export class OnboardingModule { }
