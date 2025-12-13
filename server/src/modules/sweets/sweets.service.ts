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

export function searchSweets(params: {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const { name, category, minPrice, maxPrice } = params;

  return prisma.sweet.findMany({
    where: {
      ...(name && {
        name: { contains: name, mode: 'insensitive' },
      }),
      ...(category && { category }),
      ...(minPrice || maxPrice
        ? {
            price: {
              ...(minPrice && { gte: Number(minPrice) }),
              ...(maxPrice && { lte: Number(maxPrice) }),
            },
          }
        : {}),
    },
  });
}
