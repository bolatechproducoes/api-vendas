import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';
import usersRoutes from '@modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);

export default routes;
