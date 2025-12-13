import { Request, Response } from 'express';
import { createSweet, listSweets } from './sweets.service.js';
import { searchSweets } from './sweets.service.js';

export async function create(req: Request, res: Response) {
  const sweet = await createSweet(req.body);
  return res.status(201).json(sweet);
}

export async function list(_req: Request, res: Response) {
  const sweets = await listSweets();
  return res.status(200).json(sweets);
}

export async function search(req: Request, res: Response) {
  const { name, category, minPrice, maxPrice } = req.query;

  const sweets = await searchSweets({
    name: name as string | undefined,
    category: category as string | undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  return res.status(200).json(sweets);
}
