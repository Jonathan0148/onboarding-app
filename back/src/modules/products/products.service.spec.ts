import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { InMemoryProductsRepository } from './repositories/in-memory-products.repository';
import { HttpResponseHelper } from '../../common/helpers/http-responses.helper';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RepositoryProviders } from 'src/common/constants/domains/repositories.constants';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: InMemoryProductsRepository;

  beforeEach(async () => {
    repository = new InMemoryProductsRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: RepositoryProviders.REPOSITORY,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should return all products', async () => {
    const result = await service.findAll();
    expect(result.success).toBe(true);
    expect(result.data!.length).toBeGreaterThan(0);
  });

  it('should find one product by id', async () => {
    const { data } = await repository.findAll();
    const first = Array.isArray(data) ? data[0] : data[0];
    const result = await service.findOneById(first.id);
    expect(result.data!.id).toBe(first.id);
  });

  it('should throw not found when product does not exist', async () => {
    jest.spyOn(HttpResponseHelper, 'notFound').mockImplementation(() => {
      throw new Error('Producto no encontrado');
    });

    await expect(service.findOneById('fake-id')).rejects.toThrow('Producto no encontrado');
  });

  it('should create a new product', async () => {
    const dto: CreateProductDto = {
      name: 'Nuevo Producto',
      description: 'Producto de prueba',
      rate: 2.5,
    };
    const result = await service.create(dto);
    expect(result.data!.name).toBe(dto.name);
    expect(result.message).toContain('exitosamente');
  });

  it('should update an existing product', async () => {
    const { data } = await repository.findAll();
    const existing = Array.isArray(data) ? data[0] : data[0];
    const dto: UpdateProductDto = { name: 'Producto Actualizado' };
    const result = await service.update(existing.id, dto);
    expect(result.data!.name).toBe('Producto Actualizado');
  });

  it('should delete an existing product', async () => {
    const { data } = await repository.findAll();
    const existing = Array.isArray(data) ? data[0] : data[0];
    const result = await service.delete(existing.id);
    expect(result.success).toBe(true);
  });
});
