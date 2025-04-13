import { UserController } from '../../../interfaces/controllers/userController';
import { createUserSchema } from '../../../frameworks/joi/userSchema';
import { validate } from '../middlewares/validate';
import { Router } from 'express';

export const userRouter = ( userController : UserController) => {
  const router = Router();

  /**
   * @openapi
   * /user/register:
   *   post:
   *     summary: Register to create a new user
   *     tags:
   *       - User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserRequest'
   *     responses:
   *       201:
   *         description: User created successfully
   *       400:
   *          description: Invalid data passed
   *       409:
   *         description: User already exists
  */
  router.route('/register').post(
    validate(createUserSchema), userController.register
  );

  return router;
}
