import { Request, Response, NextFunction, Router } from 'express';

import { swaggerSpec } from '../../swagger';
import swaggerUi from 'swagger-ui-express';

export const swaggerRouter = () => {
  const router = Router();

  /**
   * @openapi
   * /docs:
   *   get:
   *     summary: Watch swagger API docs
   *     tags:
   *       - Swagger
   *     responses:
   *       200:
   *         description: Retrieved swagger logs successfully
  */
  router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec) );

  router.get('/swagger-json', (_req : Request, res : Response, _ : NextFunction ) => { res.send( swaggerSpec ) } );

  return router;
}