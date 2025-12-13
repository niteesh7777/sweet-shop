import { prisma } from '../../prisma.js';

export async function registerUser(email: string, password: string) {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
}
