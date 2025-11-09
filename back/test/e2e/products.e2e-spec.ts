import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp } from './setup-e2e';
import { HttpStatusCodes } from 'src/common/constants';

describe('ProductsModule (E2E)', () => {
  let app: INestApplication;
  let jwt: string;

  beforeAll(async () => {
    app = await createTestApp();

    const authResponse = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ username: 'admin', password: '12345' });

    jwt = authResponse.body.data.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/products (GET) → should return products list', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/products')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(HttpStatusCodes.OK);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('/api/products/:id (GET) → should return a product', async () => {
    const all = await request(app.getHttpServer())
      .get('/api/products')
      .set('Authorization', `Bearer ${jwt}`);
    const productId = all.body.data[0].id;

    const response = await request(app.getHttpServer())
      .get(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(HttpStatusCodes.OK);

    expect(response.body.data.id).toBe(productId);
  });

  it('/api/products (POST) → should create a product', async () => {
    const dto = { name: 'Test Producto', description: 'desc', rate: 5 };

    const response = await request(app.getHttpServer())
      .post('/api/products')
      .set('Authorization', `Bearer ${jwt}`)
      .send(dto)
      .expect(HttpStatusCodes.CREATED);

    expect(response.body.data.name).toBe(dto.name);
  });

  it('/api/products/:id (PUT) → should update product', async () => {
    const all = await request(app.getHttpServer())
      .get('/api/products')
      .set('Authorization', `Bearer ${jwt}`);
    const productId = all.body.data[0].id;

    const response = await request(app.getHttpServer())
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: 'Actualizado' })
      .expect(HttpStatusCodes.OK);

    expect(response.body.data.name).toBe('Actualizado');
  });

  it('/api/products/:id (DELETE) → should delete product', async () => {
    const all = await request(app.getHttpServer())
      .get('/api/products')
      .set('Authorization', `Bearer ${jwt}`);
    const productId = all.body.data[0].id;
    
    await request(app.getHttpServer())
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .expect(HttpStatusCodes.OK);
  });
});
