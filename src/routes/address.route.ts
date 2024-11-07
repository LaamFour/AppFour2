import { Router } from 'express';

import { addressController } from '~/controllers';
import { authenticateToken, authorization } from '~/middlewares';

const addressRoute = Router();

addressRoute.post(
  '/addresses',
  [authenticateToken, authorization(['customer'])],
  addressController.createAddress,
);

addressRoute.get(
  '/addresses',
  [authenticateToken, authorization(['customer'])],
  addressController.getAddresses,
);

export default addressRoute;
