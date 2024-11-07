import jwt from 'jsonwebtoken';
import type { User } from '~/interfaces';
export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: '100 days',
    },
  );
};
