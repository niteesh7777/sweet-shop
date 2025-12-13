import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma.js';

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = header.split(' ')[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET) as {
      sub: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
