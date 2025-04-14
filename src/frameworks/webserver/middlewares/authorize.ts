import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../services/AuthService';
import { error } from 'console';

export const authorize = (
    authService: AuthService, requiredRoles : string[]
) : any => {
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

      const hasNoRoles = requiredRoles.filter( role => role in userClaims.roles );

      if ( hasNoRoles.length > 0 ) {
        return res.status(401).json({
            message: `User has missing roles: ${ hasNoRoles.join(', ')}`
        })
      }


      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};
