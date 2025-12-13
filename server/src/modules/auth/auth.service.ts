import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma.js';
import { EmailAlreadyExistsError } from '../../common/errors/EmailAlreadyExistsError.js';
import { signAccessToken } from '../../common/jwt/jwt.service.js';

export async function registerUser(
  email: string,
  password: string,
  role: 'USER' | 'ADMIN' = 'USER'
) {
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
      role,
    },
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const accessToken = signAccessToken(user.id);
  return { accessToken };
}
