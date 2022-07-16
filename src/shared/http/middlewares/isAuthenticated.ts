import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  //Separa o token em um array, o primeiro valor é "Bearer" e o segundo a string do token (salva na const)
  const [, token] = authHeader.split(' ');

  try {
    //decodeToken tem no parametro .sub a id do usuário
    const decodeToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodeToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
