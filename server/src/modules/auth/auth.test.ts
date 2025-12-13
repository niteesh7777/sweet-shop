import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import { prisma } from '../../prisma.js';
import jwt from 'jsonwebtoken';

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
  it('should return 400 for missing email', async () => {
    const res = await request(app).post('/api/auth/register').send({ password: 'password123' });

    expect(res.status).toBe(400);
  });

  it('should return 400 for invalid email format', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'not-an-email', password: 'password123' });

    expect(res.status).toBe(400);
  });

  it('should return 400 for short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'short@test.com', password: '123' });

    expect(res.status).toBe(400);
  });

  it('should register a user and return a valid JWT token', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'jwt@test.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');

    const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET!) as { sub: string };

    expect(decoded.sub).toBeDefined();
  });

  it('should allow access to protected route with valid token', async () => {
    const registerRes = await request(app).post('/api/auth/register').send({
      email: 'protected@test.com',
      password: 'password123',
    });

    const token = registerRes.body.token;

    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it('should reject access to protected route without token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  it('should login user and return access & refresh tokens', async () => {
    // register user first
    await request(app).post('/api/auth/register').send({
      email: 'login@test.com',
      password: 'password123',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'login@test.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });

  it('should fail login with wrong password', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'wrongpass@test.com',
      password: 'password123',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'wrongpass@test.com',
      password: 'wrongpassword',
    });

    expect(res.status).toBe(401);
  });

  it('should fail login for non-existing user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nouser@test.com',
      password: 'password123',
    });

    expect(res.status).toBe(401);
  });
});
