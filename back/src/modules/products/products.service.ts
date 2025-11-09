import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from './repositories/products.repository.interface';
import { InMemoryProductsRepository } from './repositories/in-memory-products.repository';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpSuccessHelper } from '../../common/helpers/http-success.helper';
import { HttpResponseHelper } from '../../common/helpers/http-responses.helper';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RepositoryProviders } from 'src/common/constants/domains/repositories.constants';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(RepositoryProviders.PRODUCTS)
    private readonly repository: ProductsRepository,
  ) {}

  async findAll(pagination?: PaginationDto): Promise<ApiResponse<Product[]>> {
    const { page = 1, limit = 10, term } = pagination || {};

    const { data, total } = await this.repository.findAll(page, limit, term);

    const meta = {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      limit,
      ...(term ? { filter: term } : {}),
    };

    return HttpSuccessHelper.ok(
      data,
      term
        ? `Productos filtrados por "${term}" obtenidos exitosamente.`
        : 'Productos obtenidos exitosamente.',
      meta,
    );
  }

  async findOneById(id: string): Promise<ApiResponse<Product>> {
    const product = await this.repository.findOneById(id);

    if (!product) throw HttpResponseHelper.notFound({ resource: 'Producto', id });

    return HttpSuccessHelper.ok(product);
  }

  async create(dto: CreateProductDto): Promise<ApiResponse<Product>> {
    const product = new Product();
    Object.assign(product, dto);

    const created = await this.repository.create(product);
    return HttpSuccessHelper.created(created);
  }

  async update(id: string, dto: UpdateProductDto): Promise<ApiResponse<Product>> {
    const product = await this.repository.update(id, dto);

    if (!product) throw HttpResponseHelper.notFound({ resource: 'Producto', id });

    return HttpSuccessHelper.ok(product);
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const product = await this.repository.delete(id);

    if (!product) throw HttpResponseHelper.notFound({ resource: 'Producto', id });

    return HttpSuccessHelper.ok<null>(null, 'Producto eliminado exitosamente.');
  }
}
