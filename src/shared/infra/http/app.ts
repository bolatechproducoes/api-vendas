import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '../../../shared/errors/AppError';
import '../../../shared/infra/typeorm';
import '../../../shared/container';
import uploadConfig from '../../../config/upload';
import rateLimiter from '../../../shared/infra/http/middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use('/files', express.static(uploadConfig.directory));
//Habilita as rotas definidas em src/shared/http/routes/index.ts
app.use(routes);

//Habilita o tratamento de erros gerados pelas validações do Celebrate
app.use(errors());

// Middleware de tratamento de erro
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export { app };
