import supertest from 'supertest';
import app from '../index';
const request = supertest(app);

describe('1. Test endpoint response', () => {
  it('get api/images endpoints', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });
});
