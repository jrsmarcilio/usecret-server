import { NextFunction, Request, Response } from 'express';
import CODE from 'http-status-enum';
import { AuthService } from '../services/authService';

const AuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.headers.authorization) return response.status(CODE.UNAUTHORIZED).json({ message: 'Access token is required' });
  const token = request.headers.authorization.split(' ')[1];
  if (!token) return response.status(CODE.UNAUTHORIZED).json({ message: 'Access token is required' });

  await new AuthService().verifyAccessToken(token).then((payload: any) => {
    request.user = payload;
    next();
  }).catch((e: any) => {
    next({ error: true, status: CODE.UNAUTHORIZED, message: e.message });
  });
};

export { AuthMiddleware };