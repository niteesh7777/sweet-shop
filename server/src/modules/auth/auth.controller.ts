import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service.js';
import { DomainError } from '../../common/errors/DomainError.js';
import { signToken } from '../../common/jwt/jwt.service.js';

export async function register(req: Request, res: Response) {
  try {
    const { email, password, role } = req.body;

    const user = await registerUser(email, password, role);
    const token = signToken(user.id);

    return res.status(201).json({ token });
  } catch (err) {
    if (err instanceof DomainError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    throw err;
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const token = await loginUser(email, password);
    return res.status(200).json(token);
  } catch {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}
