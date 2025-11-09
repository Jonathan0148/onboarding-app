import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './setup-e2e';
import { HttpStatusCodes } from 'src/common/constants';

describe('AuthModule (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/auth/login (POST) → should return JWT token', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username: 'admin', password: '12345' })
      .expect(HttpStatusCodes.OK);

    expect(response.body.success).toBe(true);
    expect(response.body.data.access_token).toBeDefined();
  });

  it('/api/auth/login (POST) → should reject invalid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username: 'invalid', password: 'wrong' })
      .expect(HttpStatusCodes.UNAUTHORIZED);

    expect(response.status).toBe(HttpStatusCodes.UNAUTHORIZED);
    expect(response.body).toMatchObject({
      statusCode: HttpStatusCodes.UNAUTHORIZED,
    });
  });
});
