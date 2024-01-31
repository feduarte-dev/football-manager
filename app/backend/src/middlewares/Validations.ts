import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JWT from '../utils/tokenValidation';

class Validations {
  static validateLogin = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(mapStatusHTTP('BAD_REQUEST')).json({ message: 'All fields must be filled' });
    }

    next();
  };

  static validateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ');
    const { payload } = JWT.verify(token[1]) as JwtPayload;

    if (!payload) {
      return res
        .status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token must be a valid token' });
    }

    next();
  };
}

export default Validations;
