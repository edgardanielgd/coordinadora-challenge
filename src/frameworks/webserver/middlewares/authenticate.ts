import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../services/AuthService';

export const authenticate = (authService: AuthService) : any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid token' });
      }

      const token = authHeader.split(' ')[1];
      const userClaims = authService.verifyToken(token);

      if ( !userClaims ) {
        return res.status(401).json({ message: 'Missing or invalid token' });
      }

      res.locals.claims = userClaims;

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};
