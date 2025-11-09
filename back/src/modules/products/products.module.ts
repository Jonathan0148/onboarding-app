import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { RepositoryProviders } from 'src/common/constants/domains/repositories.constants';
import { ConfigService } from '@nestjs/config';
import { SqliteProductsRepository } from './repositories/sqlite-products.repository';
import { InMemoryProductsRepository } from './repositories/in-memory-products.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: RepositoryProviders.REPOSITORY,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const repoType = config.get<string>(RepositoryProviders.REPOSITORY);
        return repoType === 'sqlite'
          ? new SqliteProductsRepository()
          : new InMemoryProductsRepository();
      },
    },
  ],
  exports: [RepositoryProviders.REPOSITORY],
})
export class ProductsModule {}
