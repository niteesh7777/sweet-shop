import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma.js';

export async function registerUser(email: string, password: string) {
  const passwordHash = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });
}
