import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrdersController';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.use(isAuthenticated);

//Utiliza o framework Celebrate como middleware para fazer a validação dos dados das rotas
ordersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRoutes;
