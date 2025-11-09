import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './setup-e2e';
import { HttpStatusCodes } from 'src/common/constants';

describe('OnboardingModule (E2E)', () => {
  let app: INestApplication;
  let jwt: string;
  let productId: string;

  beforeAll(async () => {
    app = await createTestApp();

    const authResponse = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username: 'admin', password: '12345' });

    jwt = authResponse.body.data.access_token;

    const productsResponse = await request(app.getHttpServer())
      .get('/api/products')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(HttpStatusCodes.OK);

    productId = productsResponse.body.data[0].id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/onboarding (POST) → should create onboarding', async () => {
    const dto = {
      name: 'Laura',
      document: '987654',
      email: 'laura@correo.com',
      initialAmount: 2000,
      productId,
    };

    const response = await request(app.getHttpServer())
      .post('/api/onboarding')
      .set('Authorization', `Bearer ${jwt}`)
      .send(dto)
      .expect(HttpStatusCodes.CREATED);

    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe('REQUESTED');
  });

  it('/api/onboarding (GET) → should return onboardings', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/onboarding')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(HttpStatusCodes.OK);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('/api/onboarding/:id (GET) → should return one onboarding', async () => {
    const all = await request(app.getHttpServer())
      .get('/api/onboarding')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(HttpStatusCodes.OK);

    const onboardingId = all.body.data[0].onboardingId;

    const response = await request(app.getHttpServer())
      .get(`/api/onboarding/${onboardingId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(HttpStatusCodes.OK);

    expect(response.body.data.onboardingId).toBe(onboardingId);
  });
});
