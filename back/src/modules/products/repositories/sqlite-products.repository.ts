import { Injectable, Logger } from '@nestjs/common';
import { ProductsRepository } from './products.repository.interface';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Database } from 'sqlite3';
import { randomUUID } from 'crypto';

@Injectable()
export class SqliteProductsRepository implements ProductsRepository {
    private readonly logger = new Logger(SqliteProductsRepository.name);
    private db: Database;

    constructor() {
        this.db = new Database(':memory:');
        this.initialize();
    }

    private initialize() {
        this.db.run(`
            CREATE TABLE IF NOT EXISTS products (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                rate REAL NOT NULL
            )
        `);
        this.logger.debug('SQLite database initialized for Products.');
    }

    async findAll(
        page = 1,
        limit = 10,
        term?: string,
    ): Promise<{ data: Product[]; total: number }> {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;

            let query = 'SELECT * FROM products';
            const params: any[] = [];

            if (term) {
                query += ' WHERE name LIKE ? OR description LIKE ?';
                params.push(`%${term}%`, `%${term}%`);
            }

            query += ' LIMIT ? OFFSET ?';
            params.push(limit, offset);

            this.db.all(query, params, (err, rows: any[]) => {
                if (err) return reject(err);

                const data = (rows as Product[]) ?? [];

                let countQuery = 'SELECT COUNT(*) AS total FROM products';
                const countParams: any[] = [];

                if (term) {
                    countQuery += ' WHERE name LIKE ? OR description LIKE ?';
                    countParams.push(`%${term}%`, `%${term}%`);
                }

                this.db.get(countQuery, countParams, (countErr, row: any) => {
                    if (countErr) return reject(countErr);

                    const total = (row?.total as number) ?? 0;

                    resolve({ data, total });
                });
            });
        });
    }

    async findOneById(id: string): Promise<Product | null> {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM products WHERE id = ?', [id], (err, row: any) => {
                if (err) return reject(err);

                const product = row as Product | undefined;
                resolve(product ?? null);
            });
        });
    }

    async create(data: CreateProductDto): Promise<Product> {
        const id = randomUUID();
        const { name, description, rate } = data;
        return new Promise((resolve, reject) => {
            this.db.run(
                'INSERT INTO products (id, name, description, rate) VALUES (?, ?, ?, ?)',
                [id, name, description, rate],
                (err) => {
                    if (err) return reject(err);
                    resolve({ id, name, description, rate });
                },
            );
        });
    }

    async update(id: string, data: UpdateProductDto): Promise<Product | null> {
        const existing = await this.findOneById(id);
        if (!existing) return null;

        const updated = { ...existing, ...data };

        return new Promise((resolve, reject) => {
            this.db.run(
                'UPDATE products SET name = ?, description = ?, rate = ? WHERE id = ?',
                [updated.name, updated.description, updated.rate, id],
                (err) => {
                    if (err) return reject(err);
                    resolve(updated);
                },
            );
        });
    }

    async delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            });
        });
    }
}
