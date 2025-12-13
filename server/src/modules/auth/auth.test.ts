import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import { prisma } from '../../prisma.js';

describe('Auth – Register', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
  it('should register a user and return a JWT token', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'user4@test.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should persist user in database', async () => {
    const email = 'persist@test.com';

    await request(app).post('/api/auth/register').send({
      email,
      password: 'password123',
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    expect(user).not.toBeNull();
  });

  it('should store a hashed password, not plaintext', async () => {
    const email = 'hash@test.com';
    const plainPassword = 'password123';

    await request(app).post('/api/auth/register').send({
      email,
      password: plainPassword,
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    expect(user).not.toBeNull();
    expect(user!.password).not.toBe(plainPassword);
  });

  it('should fail with 409 when registering duplicate email', async () => {
    const payload = {
      email: 'dup@test.com',
      password: 'password123',
    };

    const first = await request(app).post('/api/auth/register').send(payload);

    expect(first.status).toBe(201);

    const second = await request(app).post('/api/auth/register').send(payload);

    expect(second.status).toBe(409);
  });
});
