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

export async function purchaseSweet(id: string, qty: number) {
  const sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet || sweet.quantity < qty) {
    throw new Error('Insufficient quantity');
  }

  return prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity - qty },
  });
}

export async function restockSweet(id: string, qty: number) {
  return prisma.sweet.update({
    where: { id },
    data: { quantity: { increment: qty } },
  });
}
