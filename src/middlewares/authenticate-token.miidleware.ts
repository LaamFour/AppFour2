import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

export const authenticateToken: RequestHandler<unknown> = async (
  req,
  res,
  next,
) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
      throw createHttpError(401, req.t('unauthorized_exception'));
    }

    jwt.verify(
      accessToken as string,
      process.env.JWT_SECRET_KEY as string,
      (err, user: any) => {
        if (err) throw createHttpError(403, req.t('forbidden_exception'));
        req.user = user;
        next();
      },
    );
  } catch (error) {
    next(error);
  }
};
