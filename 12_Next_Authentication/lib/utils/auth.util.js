import { hash } from 'bcryptjs';

async function hashPassword(password) {
  const hashedPassword = hash(password, 12);
  return hashedPassword;
}

export default {
  hashPassword,
};
