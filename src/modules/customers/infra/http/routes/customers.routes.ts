import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersControllers';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';

const customersRoutes = Router();
const customersController = new CustomersController();

customersRoutes.use(isAuthenticated);

customersRoutes.get('/', customersController.index);

//Utiliza o framework Celebrate como middleware para fazer a validação dos dados das rotas
customersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show,
);

customersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.create,
);

customersRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.update,
);

customersRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
);

export default customersRoutes;
