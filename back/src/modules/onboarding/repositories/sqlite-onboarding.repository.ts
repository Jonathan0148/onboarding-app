import { Injectable, Logger } from '@nestjs/common';
import { Database } from 'sqlite3';
import { randomUUID } from 'crypto';
import { Onboarding } from '../entities/onboarding.entity';
import { CreateOnboardingDto } from '../dto/create-onboarding.dto';
import { OnboardingRepository } from './onboarding.repository.interface';

@Injectable()
export class SqliteOnboardingRepository implements OnboardingRepository {
  private readonly logger = new Logger(SqliteOnboardingRepository.name);
  private db: Database;

  constructor() {
    this.db = new Database(':memory:');
    this.initialize();
  }

  private initialize() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS onboardings (
        onboardingId TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        document TEXT NOT NULL,
        email TEXT NOT NULL,
        initialAmount REAL NOT NULL,
        productId TEXT NOT NULL,
        status TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    `);
    this.logger.debug('SQLite database initialized for Onboarding.');
  }

  async findAll(page = 1, limit = 10, term?: string): Promise<{ data: Onboarding[]; total: number }> {
    return new Promise((resolve, reject) => {
      const offset = (page - 1) * limit;
      let query = 'SELECT * FROM onboardings';
      const params: any[] = [];

      if (term) {
        query += ' WHERE name LIKE ? OR document LIKE ? OR email LIKE ?';
        params.push(`%${term}%`, `%${term}%`, `%${term}%`);
      }

      query += ' LIMIT ? OFFSET ?';
      params.push(limit, offset);

      this.db.all(query, params, (err, rows: any[]) => {
        if (err) return reject(err);

        const data = rows ?? [];

        let countQuery = 'SELECT COUNT(*) AS total FROM onboardings';
        const countParams: any[] = [];

        if (term) {
          countQuery += ' WHERE name LIKE ? OR document LIKE ? OR email LIKE ?';
          countParams.push(`%${term}%`, `%${term}%`, `%${term}%`);
        }

        this.db.get(countQuery, countParams, (countErr, row: any) => {
          if (countErr) return reject(countErr);

          const total = row?.total ?? 0;
          resolve({ data, total });
        });
      });
    });
  }

  async findOneById(id: string): Promise<Onboarding | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM onboardings WHERE onboardingId = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve((row as Onboarding) ?? null);
      });
    });
  }

  async create(data: CreateOnboardingDto): Promise<Onboarding> {
    const onboarding: Onboarding = {
      onboardingId: randomUUID(),
      ...data,
      status: 'REQUESTED',
      createdAt: new Date(),
    };

    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO onboardings (onboardingId, name, document, email, initialAmount, productId, status, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          onboarding.onboardingId,
          onboarding.name,
          onboarding.document,
          onboarding.email,
          onboarding.initialAmount,
          onboarding.productId,
          onboarding.status,
          onboarding.createdAt.toISOString(),
        ],
        (err) => {
          if (err) return reject(err);
          this.logger.debug(`Onboarding ${onboarding.onboardingId} inserted into SQLite.`);
          resolve(onboarding);
        },
      );
    });
  }
}
