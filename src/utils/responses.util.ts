import { Response } from 'express';
import moment from 'moment';

export const response = <T>(
  res: Response,
  result: {
    status_code: number;
    data?: T;
    message?: string;
    access_token?: string;
  },
) => {
  const response = {
    ...result,
    timestamp: moment().unix(),
  };

  res.status(result.status_code).json(response);
};
