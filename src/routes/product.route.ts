import { Router } from 'express';
import { productController } from '~/controllers';
import { authenticateToken, authorization, validate } from '~/middlewares';
import {
  createProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from '~/schemas';

const productRoute = Router();

productRoute.get('/products', productController.getProducts);

productRoute.get('/products/:id', productController.getProduct);

productRoute.post(
  '/products',
  [authenticateToken, authorization(['admin'])],
  validate(createProductSchema),
  productController.createProduct,
);

productRoute.put(
  '/products/:id',
  [authenticateToken],
  validate(updateProductSchema),
  productController.updateProduct,
);

productRoute.delete(
  '/products/:id',
  [authenticateToken],
  validate(deleteProductSchema),
  productController.deleteProduct,
);

export default productRoute;
