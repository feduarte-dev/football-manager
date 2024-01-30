import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';

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

    next();
  };
}

export default Validations;
