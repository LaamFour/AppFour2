import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import type { Role } from '~/interfaces';
import { UserModel } from '~/models';

export const authorization = (roles: Role[]) => {
  return async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const uid = req.user.id;

      const userExists = await UserModel.findOne({
        where: { id: uid },
      });

      if (!userExists) {
        throw createHttpError(403, req.t('forbidden_exception'));
      }

      const userRole = userExists?.toJSON().role as Role;

      if (!roles.includes(userRole)) {
        throw createHttpError(403, req.t('forbidden_exception'));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
