import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = header.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
