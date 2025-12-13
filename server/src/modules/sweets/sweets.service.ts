import { prisma } from '../../prisma.js';

export function createSweet(data: {
  name: string;
  category: string;
  price: number;
  quantity: number;
}) {
  return prisma.sweet.create({ data });
}

export function listSweets() {
  return prisma.sweet.findMany();
}
