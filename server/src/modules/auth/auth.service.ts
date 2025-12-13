import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma.js';
import { EmailAlreadyExistsError } from '../../common/errors/EmailAlreadyExistsError.js';

export async function registerUser(email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new EmailAlreadyExistsError();
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });
}
