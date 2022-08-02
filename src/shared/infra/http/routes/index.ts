import { Router } from 'express';
import productsRoutes from '@modules/products/infra/http/routes/products.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import customersRoutes from '@modules/customers/infra/http/routes/customers.routes';
import ordersRoutes from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
