import { Request, Response } from 'express';

export const register = async (_req: Request, res: Response) => {
  return res.status(201).json({ token: 'access token?' });
};
