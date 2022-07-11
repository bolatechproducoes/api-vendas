import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

//Habilita as rotas definidas em src/shared/http/routes/index.ts
app.use(routes);

// Middleware de tratamento de erro
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

//Habilita o express na porta 3333
app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333! http://localhost:3333/');
});
