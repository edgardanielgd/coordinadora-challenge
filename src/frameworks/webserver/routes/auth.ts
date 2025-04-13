import { AuthController } from '../../../interfaces/controllers/authController';
import { loginSchema } from '../../../frameworks/joi/authSchema';
import { validate } from '../middlewares/validate';
import { Router } from 'express';

export const authRouter = ( authController : AuthController) => {
  const router = Router();

  /**
   * @openapi
   * /auth:
   *   post:
   *     summary: Login to obtain an access token
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Logged in successfully
   *       400:
   *          description: Invalid data passed
   *       401:
   *         description: Invalid Credentials
  */
  router.route('/').post( validate(loginSchema), authController.auth );

  return router;
}