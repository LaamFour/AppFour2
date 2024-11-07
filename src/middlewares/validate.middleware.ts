import { RequestHandler } from 'express';

import { Schema, ValidationError } from 'yup';

export const validate =
  (schema: Schema): RequestHandler<unknown> =>
  async (req, res, next) => {
    try {
      await schema.validate(req);
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(422).json({
          error_message: error.message,
        });
      } else {
        next(error);
      }
    }
  };
