import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '1h';

export function signToken(userId: string) {
  return jwt.sign({}, JWT_SECRET, {
    subject: userId,
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
