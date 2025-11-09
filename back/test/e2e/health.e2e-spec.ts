import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './setup-e2e';
import { HttpStatusCodes } from 'src/common/constants';

describe('HealthModule (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/health (GET) → should return system status ok', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/health')
      .expect(HttpStatusCodes.OK);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      status: 'ok',
    });
  });
});
