import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { registerUser } from './auth.service.js';
import { DomainError } from '../../errors/DomainError.js';

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await registerUser(email, password);

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(201).json({ token });
  } catch (error) {
    if (error instanceof DomainError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error('Registration error:', error);
    return res.status(400).json({ error: 'Registration failed' });
  }
}
