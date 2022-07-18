import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';
import usersRoutes from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
