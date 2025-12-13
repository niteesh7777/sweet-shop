import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app.js';

describe('Auth – Register', () => {
  it('should register a user and return a JWT token', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'user1@test.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });
});
