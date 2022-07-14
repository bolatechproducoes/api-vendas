import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';

const routes = Router();

routes.use('/products', productsRoutes);

export default routes;
