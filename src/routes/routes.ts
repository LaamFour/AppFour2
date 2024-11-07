import { Router } from 'express';
import addressRoute from './address.route';
import authRoute from './auth.route';
import orderRoute from './order.route';
import productRoute from './product.route';

const routes = Router();

routes.get('/hello', (req, res) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});

routes.use(authRoute);
routes.use(productRoute);
routes.use(orderRoute);
routes.use(addressRoute);
export default routes;
