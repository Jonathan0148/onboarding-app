import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

export interface ProductsRepository {
  findAll(page?: number, limit?: number, term?: string): Promise<{ data: Product[]; total: number }>;
  findOneById(id: string): Promise<Product | null>;
  create(data: CreateProductDto): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}
