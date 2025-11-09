import { createTestApp } from './setup-e2e';
import * as request from 'supertest';

describe('Smoke Test (E2E)', () => {
  it('should start app and return health ok', async () => {
    const app = await createTestApp();
    const res = await request(app.getHttpServer()).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('ok');
    await app.close();
  });
});
