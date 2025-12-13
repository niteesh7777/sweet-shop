import { Request, Response } from 'express';
import { registerUser } from './auth.service.js';

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  await registerUser(email, password);

  return res.status(201).json({
    token: 'fake-jwt-token',
  });
}
