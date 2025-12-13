import { Request, Response } from 'express';
import { registerUser } from './auth.service.js';
import { DomainError } from '../../common/errors/DomainError.js';
import { signToken } from '../../common/jwt/jwt.service.js';

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await registerUser(email, password);
    const token = signToken(user.id);

    return res.status(201).json({ token });
  } catch (err) {
    if (err instanceof DomainError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    throw err;
  }
}
