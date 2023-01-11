import { NextFunction, Request, Response } from 'express';
import CODE from 'http-status-enum';
import { AuthRepository } from '../repository/AuthRepository';

const AuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.headers.authorization) return next({ error: true, status: CODE.UNAUTHORIZED, message: 'Access token is required' });

  const token = request.headers.authorization.split(' ')[1];
  if (!token) return next({ error: true, status: CODE.UNAUTHORIZED, message: 'Access token is required' });

  await new AuthRepository().verifyAccessToken(token).then((payload: any) => {
    request.user = payload;
    next();
  }).catch((e: any) => {
    next({ error: true, status: CODE.UNAUTHORIZED, message: e.message });
  });
};

export { AuthMiddleware };