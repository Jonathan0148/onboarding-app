import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpSuccessHelper } from '../../common/helpers/http-success.helper';
import { Product } from './entities/product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should get all products', async () => {
    const mockProducts = [{ id: '1', name: 'Cuenta', rate: 0.5 }];
    (service.findAll as jest.Mock).mockResolvedValue(HttpSuccessHelper.ok(mockProducts));

    const result = await controller.findAll({ page: 1, limit: 10 });
    expect(service.findAll).toHaveBeenCalled();
    expect(result.data).toEqual(mockProducts);
  });

  it('should get one product by id', async () => {
    const mockProduct = { id: '1', name: 'CDT' } as Product;
    (service.findOneById as jest.Mock).mockResolvedValue(HttpSuccessHelper.ok(mockProduct));

    const result = await controller.findById('1');
    expect(service.findOneById).toHaveBeenCalledWith('1');
    expect(result.data).toEqual(mockProduct);
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = { name: 'Nuevo', description: 'desc', rate: 2.3 };
    const created = { ...dto, id: 'abc' };
    (service.create as jest.Mock).mockResolvedValue(HttpSuccessHelper.created(created));

    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result.data).toEqual(created);
  });

  it('should update a product', async () => {
    const dto: UpdateProductDto = { name: 'Actualizado' };
    const updated = { id: '1', ...dto };
    (service.update as jest.Mock).mockResolvedValue(HttpSuccessHelper.ok(updated));

    const result = await controller.update('1', dto);
    expect(service.update).toHaveBeenCalledWith('1', dto);
    expect(result.data!.name).toBe('Actualizado');
  });

  it('should delete a product', async () => {
    (service.delete as jest.Mock).mockResolvedValue(HttpSuccessHelper.ok(null));

    const result = await controller.delete('1');
    expect(service.delete).toHaveBeenCalledWith('1');
    expect(result.success).toBe(true);
  });
});
