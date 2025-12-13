import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import { prisma } from '../../prisma.js';

describe('Sweets', () => {
  beforeEach(async () => {
    await prisma.sweet.deleteMany({});
    await prisma.user.deleteMany({});
  });

  it('should allow admin to create a sweet', async () => {
    const registerRes = await request(app).post('/api/auth/register').send({
      email: 'admin2@sweets.com',
      password: 'password123',
      role: 'ADMIN',
    });

    const token = registerRes.body.token;

    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gulab Jamun',
        category: 'Indian',
        price: 10,
        quantity: 100,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Gulab Jamun');
  });

  it('should list all available sweets', async () => {
    await prisma.sweet.create({
      data: {
        name: 'Rasgulla',
        category: 'Indian',
        price: 8,
        quantity: 50,
      },
    });

    const res = await request(app).get('/api/sweets');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Rasgulla');
  });
});
