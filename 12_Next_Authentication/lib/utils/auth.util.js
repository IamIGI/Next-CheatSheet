import { hash, compare } from 'bcryptjs';

async function hashPassword(password) {
  const hashedPassword = hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export default {
  hashPassword,
  verifyPassword,
};
