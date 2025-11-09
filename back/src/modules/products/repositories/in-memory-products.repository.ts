import { Injectable, Logger } from '@nestjs/common';
import { ProductsRepository } from './products.repository.interface';
import { Product } from '../entities/product.entity';
import { randomUUID } from 'crypto';
import { PRODUCT_SEED } from '../data/products.seed';

@Injectable()
export class InMemoryProductsRepository implements ProductsRepository {
  private readonly logger = new Logger(InMemoryProductsRepository.name);
  private readonly products: Product[] = [];

  constructor() {
    this.seedInitialData();
  }

  /**
   * Inicializa el repositorio con datos semilla (solo en memoria).
   */
  private seedInitialData(): void {
    this.products.push(...PRODUCT_SEED);
    this.logger.debug(
      `Repositorio InMemory inicializado con ${this.products.length} productos.`,
    );
  }

  async findAll(page = 1, limit = 10, term?: string): Promise<{ data: Product[]; total: number }> {
    let filtered = this.products;

    if (term) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerTerm) ||
          p.description.toLowerCase().includes(lowerTerm),
      );
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    return { data, total };
  }

  async findOneById(id: string): Promise<Product | null> {
    return this.products.find((p) => p.id === id) ?? null;
  }

  async create(product: Product): Promise<Product> {
    const newProduct = { ...product, id: randomUUID() };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: string, partial: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated = { ...this.products[index], ...partial };
    this.products[index] = updated;

    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    return true;
  }
}
